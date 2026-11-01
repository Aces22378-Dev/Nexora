# Nexora changelog

**Status: alpha.** Things change often, and nothing has been tested on a real Windows PC yet.

Newest first. Update this file and `version.py` for every release.

## 0.12.0
- **In-game menu**: a **Menu** button in the top-left corner (hold **Alt** to get the mouse and click it) or press **Esc**. Resume, Players, Settings (mouse sensitivity and field of view, saved for next time) and **Leave game**. Esc no longer leaves the game straight away: it opens the menu, and Esc again closes it. The game stays running behind it.
- **Badges in the player list**: the Verified / Staff picture sits at the left of each name in the Players list (top right, and the Players page of the menu).
- The score, title and health bar moved down a little to make room for the Menu button.

## 0.11.1
- **Badges**: your own Staff badge now shows even if the server's badge list can't be reached (the server already tells the app you're staff). Others' badges still need the Worker redeployed with the 0.11 `index.js`.
- **Clothing pictures in games**: if the first way of building a shirt/pants texture fails on your PC, two backup ways are tried (a Panda3D image, then a temporary PNG), and the reason is printed if all fail, instead of silently showing the plain colour.

## 0.11.0
- **Verified and Staff badges** beside names. Staff is the higher one: someone who has both (Aces22378 and Ivy) shows only the staff badge.
  - Shown in the launcher top bar, People, profiles, game cards and game pages (owner and developers), the Shop ("by ...") and in games: the badge floats above the name tag, and chat lines get a [Staff] / [Verified] tag.
  - The server decides: staff = the staff list, verified = `NEXORA_VERIFIED` (Worker variable or environment variable, comma separated, default "Aces22378,Ivy"). Anyone can read the list at `/api/badges`.
  - Needs the Worker redeployed (`index.js`). Not yet in Nexora Studio.
- **Fix:** the 0.10.2 zip had an empty `version.py`, which stopped Nexora Studio from starting. This version has it back.

## 0.10.2
- **Owned Accessories tab** in the Shop: accessories you own no longer show in the shop lists, they're in this tab (with Wear / Take off).
- **Body options on the Avatar page**: **Male / Female**, **Height** and **Width** sliders (85% to 115%), Reset size, and a **Custom skin colour** picker.
  - Female: slimmer torso and arms, lashes and pink lips. Height and width scale the whole avatar from the feet up, hats included, in the launcher and in 3D in games.
  - The server stores and checks them (clamped to the range). Needs the Worker redeployed (`avatar.js`).

## 0.10.1
- **Body item prices and the Legless bundle**:
  - **Headless** is now **31,000 Nexei**.
  - **Legless** is one **bundle for 17,000 Nexei**. Buying it gives you a **Left** and a **Right** leg item (no price of their own, they can't be bought separately and only show in the Shop once you own them, marked "Included with Legless").
  - You can wear **only one leg item at a time**. Wearing the other one swaps it. The server enforces it too.
  - The bundle itself isn't worn, it only hands out the two legs.
  - Servers that already had the older prices (200 / 100) move to the new ones by themselves; a price you changed yourself in the database is left alone. People who bought the old separate legs keep them.
  - Needs the Worker redeployed (`index.js`, `avatar.js`).

## 0.10.0
- **Headless and Legless** (looks only, no gameplay effect): three official items in the Shop, sold by Nexora.
  - **Headless** (200 Nexei) takes your head off.
  - **Legless (Left)** and **Legless (Right)** (100 Nexei each) take that leg off. They are separate items, so you can wear one or both. "Left" is your own left, as you see it from behind your avatar in a game.
  - Hats and other accessories stay where they are, so a hat floats over a headless avatar. Pants pictures stay on the leg that is left.
  - They show in the launcher preview, in 3D in games and for everyone in your room. Walking animation keeps working.
  - Only staff can make this kind of item (Workshop > Accessory > *Worn on* shows nohead / noleftleg / norightleg for staff). The three official ones are created automatically; change a price with a database update if you want.
  - Needs the Worker redeployed (`index.js`, `avatar.js`).

## 0.9.4
- **Richer Discord presence**: two lines of text, a player count and buttons, besides "Playing Nexora" / "Playing Nexora Studio" and the timer.
  - Nexora: "Browsing games"; while you play: **Playing <game>** and "On an online server" (with **x of y players**, refreshed every 20 seconds), "On a server" (LAN) or "Playing alone".
  - Studio: "Choosing a project", **Editing <project>**, **Testing <project>**.
  - Two buttons for other people: **Get Nexora** (set `DOWNLOAD_URL` in `discordrpc.py`; it is your GitHub profile for now) and **Join our Discord**.
  - Big picture: upload `nexora_logo` / `studio_logo` as Art Assets in the two Discord applications (Rich Presence > Art Assets). Without them Discord shows no picture.

## 0.9.3
- Discord presence now has the real Nexora and Nexora Studio Application IDs filled in, so it works without any setup (Discord desktop app open, activity sharing on).

## 0.9.2
- **Discord Rich Presence** (`discordrpc.py`): while Nexora is open your Discord profile shows **Playing Nexora** with a running timer, and **Playing Nexora Studio** while Studio is open. Nothing else is shown. It does nothing until you paste the two Application IDs into `discordrpc.py` (see the file for the steps), needs the Discord desktop app to be open, and reconnects by itself if Discord is opened later or restarted. `NEXORA_NO_DISCORD=1` turns it off. Adds the `pypresence` package. Tested against a fake Discord connection; not against real Discord.

## 0.9.1
- Workshop: a **Grid** checkbox in the picture editor turns the grid lines on and off. Off shows the picture exactly as it will look, with no lines over it. The setting stays when you switch between Front and Sleeves.

## 0.9.0
- **Sleeves**: a shirt now has a second picture for the sleeves (16 x 32 pixels, the front of both arms). In the Workshop's Shirt tab pick **Front** or **Sleeves**. Sleeves show in the launcher preview and in 3D in games, for everyone in the room.
- **Sharper clothes**: shirt front and pants pictures are now **32 x 32** pixels (was 8 x 8) with **16 colours** (was 8). Old 8 x 8 items still work.
- **Better editor**: bigger canvas, **Fill** (bucket) and **Pick colour** tools next to Paint, right-click to erase. *Import PNG / JPG* fits the picture to the part you are editing (32 x 32 front, 16 x 32 sleeves). Pixel art whose size is a multiple of that comes out exactly.
- The server only gives you sleeves that belong to a shirt you own (they are dropped otherwise), and checks every picture's size and colours again. Redeploy the Worker (`index.js`, `avatar.js`) for this version.
- Not built yet: separate left/right sleeves (the same picture goes on both arms), pictures on the back or sides of the torso, legs showing a different picture each.

## 0.8.0
- **3D model accessories**: in the Workshop, press *Import 3D model...* and pick an **OBJ, STL, PLY, GLB or glTF** file. Turn it, resize it and move it until it sits right on the preview; colours from the file (OBJ .mtl, glTF materials, PLY vertex colours) are kept, up to 8. You can mix a model with boxes in one accessory. Models bigger than 1,000 triangles are simplified automatically. Textures, animation and bones are ignored. Staff review models like any other item.
- **The accessory presets are gone** (Top hat, Cap, Glasses, Backpack, Scarf). Start from nothing, boxes, or a model.
- **PNG / JPG clothing import**: *Import PNG / JPG...* in the shirt and pants editor squashes the picture to 8 x 8 pixels and 8 colours. PNG keeps see-through parts; pixel art that is 8, 16 or 32 pixels wide comes out exactly. JPG works but looks blurry.
- **The server is fixed**: Nexora and Studio always use the official server and the "Server..." button is gone. Developers can bring it back with `NEXORA_ALLOW_SERVER_CHANGE=1`, or point at another server with `NEXORA_SERVER`. This is a setting in the app, not a security feature: the server itself decides who owns what.
- Worker `schema.sql` no longer has `--` comments, so it pastes into the Cloudflare D1 console.
- Server and Worker both re-check every model (point/triangle limits, valid numbers, coordinates clamped into the avatar's space).

## 0.7.1
- **Cloudflare Worker server** (`worker/`): the whole online server ported to Workers + D1 + Durable Objects (accounts, games, likes, Nexei, shop, Workshop review, gamepasses, live rooms and chat). Tested locally with Cloudflare's own runtime against the same test suites as the Python server. Not deployed to real Cloudflare from here.
- Python server and the Worker can share one D1 database (the Python server accepts the Worker's password hashes).
- Servers refuse games over ~1.8 MB when published on the Worker (D1 row limit).

## 0.7.0
- **Workshop**: anyone can design a shirt or pants (base colour + 8x8 pixel picture) or an accessory (up to 8 coloured boxes: hats, glasses, backpacks, scarves) and sell it for Nexei. You get 70% of every sale.
- Items from non-staff wait in a **review queue**; staff approve or reject them in the Shop (Review tab). Staff items go on sale at once.
- Shop has tabs (Shirts, Pants, Accessories, My items, Review), Wear / Take off, and previews on a little avatar.
- Pictures and accessories show on your avatar in the launcher and in 3D in games, for everyone in the room.
- The server decides what you can wear (only items you own) and now takes your look from your account, not from the game client, so nobody can fake clothes they haven't bought.
- Not built: moderation beyond staff review (no automatic filter), selling a made item's picture as a real texture upload, trading.

## 0.6.1
- Optional **Cloudflare D1 backup** for the online server (`d1_mirror.py`): accounts, Nexei, purchases, games and likes survive restarts on free hosting. Set `CF_ACCOUNT_ID`, `CF_D1_DATABASE_ID`, `CF_API_TOKEN`. Off by default.
- Studio: fixed adding a gamepass crashing the dialog's background thread.

## 0.6.0
- **Nexei** (plural Nexeis in chat, 1 Nexei): the currency of Nexora. Wallet in the top bar, new **Shop** page.
- Free **100 Nexei every 24 hours** (claim in the Shop). There is **no real-money purchase** of Nexei yet.
- **Clothing**: staff add shirts and pants to the Shop; you buy them and wear them. The server only lets you wear free colours or ones you own.
- **Gamepasses**: creators and developers add passes in Studio (Game settings > Gamepasses). Players buy them on the game's page; the creator gets 70%. Scripts use `player.has_pass("Name")` (Play Test: you own all passes).
- **Staff accounts** (Aces22378, Ivy) have unlimited Nexei. Their names can only be registered with the server's staff code, so nobody can sign up as them.
- Everything is stored and checked on the server, so the Shop needs an online server.

## 0.5.3
- Single-file builds: `build_exe_onefile.bat` -> `dist\Nexora.exe`, `build_studio_exe_onefile.bat` -> `dist\NexoraStudio.exe`. The GitHub workflow now makes single files too.
- Loading picture (splash) while the exe starts; it closes when the window is ready.
- Running from source: a "Downloading dependencies" window with a progress bar installs missing packages (ursina, websockets).
- Note: a single-file exe unpacks itself on every start, so launching a game is a bit slower than the folder build.

## 0.5.2
- Nexora Studio has its own logo and icon (window, sign-in screen, `NexoraStudio.exe`).

## 0.5.1
- Added this changelog and `version.py` (Studio's Help > About now shows the version).

## 0.5
- **Health:** `player.health`, `max_health`, `regen`, `damage(n)`, `heal(n)`, `alive`, and an `on_died(player)` event.
  At 0 health the player respawns at the spawn. A health bar shows when hurt. Kill brick: `who.health = 0`.
- **Studio 3D view:** parts standing on big flat parts (like the baseplate) no longer get hidden or jagged;
  draw order now uses true distance and smaller tiles.
- GitHub workflow (`.github/workflows/build.yml`) that builds `Nexora.exe` and `NexoraStudio.exe` on Windows.

## 0.4
- **Online server** (`nexora_server.py`): accounts, game publishing, likes, play counts, live rooms, chat.
  Players land in a server with room, or a new one is started. Names in online servers come from the account.
- Game page in Nexora: thumbnails, description, plays, likes, live servers, Like, Play.
- Studio signs in online, publishes to the server, and adds thumbnails from the 3D view.
- Scripts from other creators are off by default (Settings > Gameplay).
- Render deploy files (`Dockerfile`, `render.yaml`).

## 0.3
- Studio needs a sign-in. Games have an owner and developers; only they can open or publish the game.
- [DEV] badge next to owners and developers (player list, name tags, chat).
- In-game text chat (Enter to type), with a chat permission setting (everyone / friends / off).
- Studio visual fixes (borders, labels, size checks).

## 0.2
- **Nexora Studio** as its own app: 3D editor (select/move/scale/rotate, snapping), Explorer, Properties,
  Python script editor, Play Test, Publish, undo/redo. Scripts are Python, not Luau.

## 0.1
- Nexora launcher: accounts, games, servers (host/join, LAN discovery), people and friends, avatars,
  settings (11 categories), parental controls. Third-person Ursina games.
