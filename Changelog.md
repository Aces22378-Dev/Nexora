# Nexora changelog

Newest first. Update this file and `version.py` for every release.

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
