<h1 align="center">Boralabs - AI Prompt Market Project</h1>
<p align="center">
<img alt="Version Badge" src="https://img.shields.io/badge/version-1.0-teal">
<img alt="Node Badge" src="https://img.shields.io/badge/node-%5E20.12-blue?logo=nodedotjs">
<img alt="Yarn Badge" src="https://img.shields.io/badge/yarn-1.22-blue?logo=yarn">
<img alt="License Badge" src="https://img.shields.io/badge/license-MIT-greenyellow">
<a href="https://medium.com/boraecosystem" target="_blank"><img alt="Medium Badge" src="https://img.shields.io/badge/read_more-gray?logo=medium"></a>
<a href="https://twitter.com/bora_ecosystem" target="_blank"><img alt="Twitter Badge" src="https://img.shields.io/badge/follow-white?logo=x&logoColor=black"></a>
</p>

## Introduction

AI Prompt Market is an innovative AI-centric platform for trading high-quality prompts used in AI-powered Stable Diffusion image generation. This market allows creative prompt creators with deep understanding of AI to sell their AI-optimized works, while users can purchase these prompts to harness the power of AI in generating unique and beautiful images.

## Installation

### System Requirement

- 🐳 **Docker Desktop** (latest with docker-compose)
- 🥮 **Ganache GUI** [download](https://trufflesuite.com/ganache/)
- 🟩 **Node v20.17**
- 🐱 **Yarn v1.22.22**
- 🌐 **Chrome Web Browser / with Metamask Extension** [🦊]('https://metamask.io/download/')
- 📝 **Visual Studio Code** (Or any text editors of your choice ❤️)
- **git**
- **WSL 2** (for windows only)

**Step 1. Create project directory and clone projects from github**</br>

```shell
mkdir prompt-project
cd prompt-project
git clone https://github.com/boraecosystem/boralabs-prompt
git clone https://github.com/boraecosystem/boralabs-prompt-contract
git clone https://github.com/boraecosystem/boralabs-prompt-api
```

**Step 2. Open Ganache GUI** </br>

- Refer to 👉 [Ganache Quick Start](https://trufflesuite.com/docs/ganache/quickstart/)
- Open Ganache > Click Quick start
- Get the Private Key for the first account (Use it for Step 3 and import it to your Metamask)
- Import your private key to your Metamask (Latest version of Chrome Recommended)

[How to import a private key to
Metamask](https://support.metamask.io/hc/en-us/articles/360015489331-How-to-import-an-account)

**Step 3. Deploy Contracts** </br>

- Follow the readme.md file in the boralabs-prompt-contract project to deploy the contract and create an .env file.
- After that, use the following command to copy the .env file.

```shell
cp ./output/.env.front ../boralabs-prompt/.env
```

**NOTE:** current directory is "prompt-project/boralabs-prompt-contract."

- Setting up the API server based on the README.md in boralabs-prompt-api

**Also NOTE:** By the end of step 3, you will have a .env file contains chain information, contract addresses, and api endpoint in
your "boralabs-prompt" directory.

**Step 4. Install required packages via Yarn**</br>

```shell
cd ../boralabs-prompt
yarn install
code . // open your text editor (optional)
```

**NOTE:** current directory is "prompt-project/boralabs-prompt."

**step 5. Run Application**

```shell
yarn dev
```

- open [http://localhost:8080](http://localhost:8080) on Chrome
- Login with Metamask

## Licenses

**MIT** License, see [LICENSE](./LICENSE).

---

## References & Docs

- OpenZeppelin ERC-20: [https://docs.openzeppelin.com/contracts/5.x/api/token/erc20](https://docs.openzeppelin.com/contracts/5.x/api/token/erc20)
- OpenZeppelin ERC-721: [https://docs.openzeppelin.com/contracts/5.x/api/token/erc721](https://docs.openzeppelin.com/contracts/5.x/api/token/erc721)
