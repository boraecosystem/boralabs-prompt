<template>
  <ul class="inner guide">
    <li>
      <em>Step 1</em>
      <p>
        Click "Sign in" in the top-right corner to connect your Metamask wallet.
        Once connected, hover over the token icon in the header and click "Mint"
        to receive TPZ tokens (Topaz) for testing and purchases.
      </p>
    </li>
    <li>
      <em>Step 2</em>
      <p>
        Browse stamp stores and select one to view details. On the store page,
        read the prompt description. Use the "Try It Out" section below to input
        a target object (max 20 characters) and preview the AI-generated result.
      </p>
    </li>
    <li>
      <em>Step 3</em>
      <p>
        To purchase, click "Buy Now" on the store page. At checkout, generate
        and select an image for your NFT metadata. Complete the purchase to mint
        your stamp NFT with TPZ tokens. View your new stamp in "My Stamps" and
        access full prompt details on the store page.
      </p>
    </li>
    <!-- <li>
      <em>Step 4</em>
      <p>guide text</p>
    </li> -->
  </ul>
</template>

<style lang="scss" scoped>
.guide {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 60px;
  li {
    text-align: center;
    em {
      display: block;
      margin-top: 25px;
      font-family: PM;
      font-size: 2rem;
    }
    p {
      margin-top: 10px;
      line-height: 1.4;
      color: $graya;
    }

    @for $i from 1 to 4 {
      &:nth-child(#{$i}) {
        &::before {
          @include img(ic-guide#{$i}, 50, 50);
          content: "";
        }
      }
    }
  }
}
</style>
