#!/usr/bin/env python3
"""Nexora YT Automation: sends @The_Only_Aces videos and community posts
that contain #Nexora to a Discord webhook. No dependencies beyond Python 3."""
import json
import os
import re
import sys
import time
import urllib.error
import urllib.request
import xml.etree.ElementTree as ET

HANDLE = "The_Only_Aces"
TAG = "#nexora"  # matched case-insensitively
STATE_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "seen.json")
WEBHOOK = os.environ.get("DISCORD_WEBHOOK_URL")
# First run normally just records what already exists so old uploads aren't spammed.
POST_ON_FIRST_RUN = os.environ.get("POST_ON_FIRST_RUN") == "1"
UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/130.0 Safari/537.36")


def fetch(url):
    req = urllib.request.Request(url, headers={
        "User-Agent": UA,
        "Accept-Language": "en-US,en;q=0.9",
        "Cookie": "CONSENT=YES+1; SOCS=CAI",  # skips the EU consent page
    })
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read().decode("utf-8", "replace")


def channel_id():
    cid = os.environ.get("YT_CHANNEL_ID")
    if cid:
        return cid
    html = fetch(f"https://www.youtube.com/@{HANDLE}")
    for pattern in (r'"externalId":"(UC[\w-]{22})"',
                    r'<link rel="canonical" href="https://www\.youtube\.com/channel/(UC[\w-]{22})"'):
        m = re.search(pattern, html)
        if m:
            return m.group(1)
    raise RuntimeError("Couldn't find channel ID; set YT_CHANNEL_ID in the workflow")


def videos(cid):
    ns = {"a": "http://www.w3.org/2005/Atom",
          "yt": "http://www.youtube.com/xml/schemas/2015",
          "media": "http://search.yahoo.com/mrss/"}
    root = ET.fromstring(fetch(f"https://www.youtube.com/feeds/videos.xml?channel_id={cid}"))
    out = []
    for e in root.findall("a:entry", ns):
        vid = e.findtext("yt:videoId", default="", namespaces=ns)
        title = e.findtext("a:title", default="", namespaces=ns)
        desc = e.findtext("media:group/media:description", default="", namespaces=ns)
        if vid:
            out.append(("v:" + vid, f"{title}\n{desc}", f"https://www.youtube.com/watch?v={vid}"))
    return out


def walk(o):
    if isinstance(o, dict):
        yield o
        for v in o.values():
            yield from walk(v)
    elif isinstance(o, list):
        for v in o:
            yield from walk(v)


def posts():
    # Unofficial: scrapes the /posts page. Breaks if YouTube changes its layout.
    html = fetch(f"https://www.youtube.com/@{HANDLE}/posts")
    m = re.search(r"var ytInitialData\s*=\s*(\{.*?\});\s*</script>", html, re.S)
    if not m:
        print("WARN: no post data found (layout change or request blocked)")
        return []
    out, found = [], set()
    for d in walk(json.loads(m.group(1))):
        pid = d.get("postId")
        if not isinstance(pid, str) or pid in found or "contentText" not in d:
            continue
        found.add(pid)
        text = "".join(r.get("text", "") for r in d["contentText"].get("runs", []))
        out.append(("p:" + pid, text, f"https://www.youtube.com/post/{pid}"))
    return out


def send(link):
    body = json.dumps({"content": f"New #Nexora upload from Aces!\n{link}"}).encode()
    for _ in range(3):
        req = urllib.request.Request(WEBHOOK, data=body, headers={
            "Content-Type": "application/json",
            "User-Agent": "NexoraYTAutomation/1.0",  # Discord rejects urllib's default UA
        })
        try:
            urllib.request.urlopen(req, timeout=30).close()
            return
        except urllib.error.HTTPError as e:
            if e.code != 429:
                raise
            wait = json.loads(e.read() or b"{}").get("retry_after", 2)
            time.sleep(float(wait) + 0.5)
    raise RuntimeError("Discord kept rate-limiting the webhook")


def main():
    if not WEBHOOK:
        sys.exit("DISCORD_WEBHOOK_URL is not set")
    first_run = not os.path.exists(STATE_FILE)
    seen = set()
    if not first_run:
        with open(STATE_FILE) as f:
            seen = set(json.load(f))

    items = []
    try:
        items += videos(channel_id())
    except Exception as e:
        print("WARN videos:", e)
    try:
        items += posts()
    except Exception as e:
        print("WARN posts:", e)

    new = [i for i in items if i[0] not in seen]
    try:
        for key, text, link in reversed(new):  # oldest first
            if TAG in text.lower() and (not first_run or POST_ON_FIRST_RUN):
                send(link)
                print("Posted", link)
                time.sleep(1)
            seen.add(key)
    finally:
        with open(STATE_FILE, "w") as f:
            json.dump(sorted(seen), f, indent=0)
    print(f"Checked {len(items)} items, {len(new)} new")


if __name__ == "__main__":
    main()
