# Nexora

**Nexora** is a desktop gaming platform built with Python.

Play games, explore the Nexora library, manage your account, customize your profile, and earn **Nexis (NX)** through gameplay and platform activities.

## Features

- Desktop game launcher
- Account registration and login
- Player profiles
- Friends system
- Blocking and privacy settings
- Avatar customization
- Game browser
- Ursina-powered games
- Player settings
- Windows `.exe` builds

## Project Structure

```text
Nexora/
│
├── launcher/
│   ├── main.py
│   ├── accounts.py
│   ├── games.py
│   └── ...
│
├── games/
│   ├── game1/
│   ├── game2/
│   └── ...
│
├── assets/
│   ├── images/
│   ├── sounds/
│   └── ...
│
├── website/
│   ├── index.html
│   ├── style.css
│   └── main.js
│
├── build/
│   ├── Nexora.spec
│   └── build_exe.bat
│
├── requirements.txt
└── README.md
```

## Requirements

Nexora currently requires:

- Windows
- Python 3.x
- Python packages listed in `requirements.txt`
- PyInstaller for creating Windows builds

## Running Nexora

Clone or download the repository, then open a terminal in the Nexora folder.

Install the dependencies:

```bash
python -m pip install -r requirements.txt
```

Start Nexora:

```bash
python main.py
```

## Building the Windows EXE

PyInstaller is used to create the Windows executable.

Install PyInstaller:

```bash
python -m pip install pyinstaller
```

Build Nexora:

```bash
python -m PyInstaller --noconfirm --clean --windowed --name Nexora main.py
```

The resulting build will be placed in the `dist` folder.

```text
dist/
└── Nexora/
    └── Nexora.exe
```

## Nexis (NX)

**Nexis**, represented by **NX**, is Nexora's virtual currency.

NX is designed to be earnable through normal platform activity.

Possible ways to earn NX include:

- Daily login rewards
- Playing games
- Achievements
- Events
- Other platform activities

Rewards may have daily or activity limits to help prevent automated abuse.

## Games

Nexora games can run separately from the main launcher.

Games are launched by the Nexora launcher and can use the player's Nexora account information where supported.

Games may be built using **Ursina** and other Python libraries.

## Website

The website will provide information about Nexora, updates, and downloads.

## Releases

Windows builds are distributed through **GitHub Releases**.

The latest release will contain the current Nexora Windows executable.

## Development Status

Nexora is currently in active development.

Some features may change, be incomplete,
