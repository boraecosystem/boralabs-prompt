<template>
  <footer>
    <section class="inner">
      <div>
        <a href="https://www.boralabs.com/" target="_blank">
          <NuxtImg
            src="images/ic-boralabs.svg"
            width="213"
            height="40"
            fit="cover"
            alt="BORA Labs"
          />
        </a>
        <a
          href="https://github.com/boraecosystem/boralabs-prompt"
          class="btn-git"
          target="_blank"
          >Github</a
        >
        <p class="copyright">
          © METABORA SINGAPORE PTE. LTD. All Rights Reserved.
        </p>
      </div>

      <div class="fr">
        <a href="https://www.boraportal.com/" target="_blank">
          <NuxtImg
            src="images/ic-bora.svg"
            width="52"
            height="16"
            alt="BORA portal"
          />
        </a>
        <a href="https://scope.boraportal.cc/" target="_blank">
          <NuxtImg
            src="images/ic-borascope.svg"
            width="96"
            height="16"
            alt="BORA scope"
          />
        </a>
        <a href="https://www.boralabs.com/" target="_blank">
          <NuxtImg
            src="images/ic-boralabs-color.svg"
            width="87"
            height="16"
            alt="BORA labs"
          />
        </a>
        <a href="https://www.boralabs.com/policy.html" target="_blank"
          >Terms of Use</a
        >
      </div>
    </section>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  padding: 60px 0;
  border-top: 1px solid rgba(#fff, 0.08);

  .inner {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .btn-git {
    @include flex-center;
    width: 115px;
    height: 46px;
    margin-top: 24px;
    border: 1px solid $gray;
    border-radius: 8px;
    color: $gray;
    transition: opacity 0.24s;

    &::before {
      content: "";
      @include img(github, 20, 20);
      margin-right: 6px;
    }

    &:hover {
      opacity: 0.8;
    }
  }
}

.copyright {
  margin-top: 120px;
  font-size: 1.2rem;
  color: $graya;
}

.fr {
  display: flex;
  align-items: center;
  margin: -2px -10px 0 0;
  font-size: 1.4rem;

  a {
    padding: 10px;
    &:not(:first-child) {
      margin-left: 40px;
    }
  }
}
</style>
