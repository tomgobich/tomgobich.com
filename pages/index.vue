<template>
  <div>
    <kinesis-container class="hero-background">
      <div class="imgloaded hero-container">
        <section class="hero h-screen overflow-hidden relative bg-drak">
          <kinesis-element
            class="glitch bg"
            :strength="10"
            :type="'translation'"
          >
            <div class="glitch__img" :style="glitchBgStyle"></div>
            <div class="glitch__img" :style="glitchBgStyle"></div>
            <div class="glitch__img" :style="glitchBgStyle"></div>
            <div class="glitch__img" :style="glitchBgStyle"></div>
            <div class="glitch__img" :style="glitchBgStyle"></div>
          </kinesis-element>
          <kinesis-element class="glitch" :strength="-10" :type="'translation'">
            <div class="glitch__img" :style="glitchStyle"></div>
            <div class="glitch__img" :style="glitchStyle"></div>
            <div class="glitch__img" :style="glitchStyle"></div>
            <div class="glitch__img" :style="glitchStyle"></div>
            <div class="glitch__img" :style="glitchStyle"></div>
          </kinesis-element>
          <div
            class="glitch-content w-full h-full flex items-center justify-center md:p-12"
          >
            <div class="hero-gradients"></div>
            <kinesis-element class="p-12" :strength="20" type="translation">
              <div class="text-center">
                <h3 class="content__text text-gray-200">
                  {{ welcomeMessage }}, I'm
                </h3>
                <h1 class="content__title text-white">TOM GOBICH</h1>
                <p ref="bio" class="content__desc text-gray-200">
                  {{ bioMessage }}
                </p>
              </div>
            </kinesis-element>
            <div class="content__action text-center mt-6"></div>
          </div>
        </section>
      </div>
    </kinesis-container>
  </div>
</template>

<script>
import MessageService from '@/services/MessageService'

export default {
  computed: {
    glitchStyle() {
      return {
        backgroundImage: `url('${require('~/assets/images/logo.svg')}')`,
      }
    },
    glitchBgStyle() {
      return {
        backgroundImage: `url('${require('~/assets/images/oriental-tiles.png')}')`,
      }
    },
    welcomeMessage() {
      return MessageService.getWelcome()
    },
  },

  data: () => ({
    bioMessage: `I'm a developer at Gardner Business Media`,
    bioMessageIteration: 0,
  }),

  mounted() {
    const el = this.$refs.bio
    const animationEvent = this.whichAnimationEvent(el)
    animationEvent &&
      el.addEventListener(animationEvent, () => {
        this.cycleBioMessage()
        setInterval(() => this.cycleBioMessage(), 4000)
      })
  },

  methods: {
    cycleBioMessage() {
      this.bioMessageIteration =
        this.bioMessageIteration === 6 ? 0 : this.bioMessageIteration + 1
      this.bioMessage = this.getBioMessage()
    },

    getBioMessage() {
      switch (this.bioMessageIteration) {
        case 0:
          return "I'm a developer at Gardner Business Media"
        case 2:
          return 'I specialize in Vanilla JavaScript & Vue on the Front-End'
        case 3:
          return 'Laravel, AdonisJS, and Amplify on the Back-End'
        case 3:
          return 'I Have Borador pup named Janet'
        case 4:
          return 'I Play Battlefield in my spare time'
        case 5:
          return 'My side projects are jagr.co, tyrdrop.com, and thumbtemps.net'
        case 6:
          return "That's about it"
        default:
          return "I'm a developer at Gardner Business Media"
      }
    },

    whichAnimationEvent(el) {
      let t
      const animations = {
        animation: 'animationstart',
        OAnimation: 'oAnimationStart',
        MozAnimation: 'animationstart',
        WebkitAnimation: 'webkitAnimationEnd',
      }

      for (let a in animations) {
        if (el.style[a] !== undefined) {
          return animations[a]
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.glitch.bg,
.glitch-content {
  opacity: 0;
  animation: fade-in;
  animation-duration: 3s;
  animation-fill-mode: forwards;
}
.hero-background {
  background: theme('colors.black');
}
.hero-container {
  width: 100%;
  max-width: 2080px;
  background: theme('colors.black');
  position: relative;
  margin: 0 auto;
  .hero-gradients {
    z-index: 50;
    &:before {
      content: '';
      width: 100%;
      height: 100%;
      position: absolute;
      background: radial-gradient(
        circle,
        transparent 15%,
        theme('colors.black') 90%
      );
      top: 0;
      left: 0;
      z-index: 50;
    }
    &:after {
      content: '';
      width: 100%;
      height: 50%;
      position: absolute;
      background: linear-gradient(to top, theme('colors.black'), transparent);
      bottom: 0;
      left: 0;
      z-index: 50;
    }
  }
  .img-source {
    background: rgba(0, 0, 0, 0.8);
    border-top-left-radius: theme('borderRadius.lg');
    color: theme('colors.gray.300');
    padding: theme('padding.3');
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: 80;
  }
}
.hero {
  --color-text: theme('colors.white');
  --color-bg: theme('colors.black');
  --color-link: theme('colors.blue.400');
  --color-link-hover: theme('colors.white');
  --color-info: theme('colors.blue.400');
  --glitch-width: 100vw;
  --glitch-height: 100vh;
  --gap-horizontal: 20px;
  --gap-vertical: 10px;
  --time-anim: 4s;
  --delay-anim: 2s;
  --blend-mode-1: none;
  --blend-mode-2: none;
  --blend-mode-3: none;
  --blend-mode-4: none;
  --blend-mode-5: overlay;
  --blend-color-1: transparent;
  --blend-color-2: transparent;
  --blend-color-3: transparent;
  --blend-color-4: transparent;
  --blend-color-5: theme('colors.blue.400');
}
.imgloaded .content__title,
.imgloaded .content__text,
.imgloaded .content__desc {
  animation-name: glitch-anim-text;
  animation-duration: var(--time-anim);
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}
.content__title {
  background: rgba(0, 0, 0, 0.9);
  /* border-radius: theme('borderRadius.lg'); */
  font-size: 10vw;
  font-weight: bold;
  line-height: 1.25;
  margin: 0;
  position: relative;
  padding: 0 theme('padding.6');
  margin: 0;
  animation-delay: calc(var(--delay-anim) + var(--time-anim) * 0.2);
}
.content__text {
  display: inline-block;
  font-size: 2vw;
  font-weight: 500;
  background: rgba(0, 0, 0, 0.9);
  /* border-top-right-radius: theme('borderRadius.lg');
  border-top-left-radius: theme('borderRadius.lg'); */
  line-height: 1.5;
  padding: theme('padding.2') theme('padding.6');
  animation-delay: calc(var(--delay-anim) + var(--time-anim) * 0.225);
  position: relative;
  top: 0.5px;
}
.content__desc {
  display: inline-block;
  font-size: 2vw;
  font-weight: 500;
  background: rgba(0, 0, 0, 0.9);
  /* border-bottom-right-radius: theme('borderRadius.lg');
  border-bottom-left-radius: theme('borderRadius.lg'); */
  line-height: 1.5;
  padding: theme('padding.2') theme('padding.6');
  animation-delay: calc(var(--delay-anim) + var(--time-anim) * 0.25);
  position: relative;
  top: -0.5px;
  z-index: 70;
}
.content__action {
  position: relative;
  z-index: 70;
}
@media screen and (max-width: 55em) {
  .content__text {
    position: relative;
    right: auto;
    top: auto;
    font-size: 1.25em;
    padding: 0 1em;
    text-align: center;
  }
}
/* Glitch styles */
.glitch {
  position: absolute;
  top: 0;
  left: 0;
  width: var(--glitch-width);
  height: var(--glitch-height);
  overflow: hidden;
}
.glitch__img {
  position: absolute;
  top: calc(-1 * var(--gap-vertical));
  left: calc(-1 * var(--gap-horizontal));
  width: calc(100% + var(--gap-horizontal) * 2);
  height: calc(100% + var(--gap-vertical) * 2);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 50%;
  background-color: var(--blend-color-1);
  transform: translate3d(0, 0, 0);
  background-blend-mode: var(--blend-mode-1);
}
.glitch.bg .glitch__img {
  background-repeat: repeat;
  background-size: auto;
  opacity: 0.5;
}
.glitch__img:nth-child(n + 2) {
  opacity: 0;
}
.imgloaded .glitch__img:nth-child(n + 2) {
  animation-duration: var(--time-anim);
  animation-delay: var(--delay-anim);
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}
.imgloaded .glitch__img:nth-child(2) {
  background-color: var(--blend-color-2);
  background-blend-mode: var(--blend-mode-2);
  animation-name: glitch-anim-1;
}
.imgloaded .glitch__img:nth-child(3) {
  background-color: var(--blend-color-3);
  background-blend-mode: var(--blend-mode-3);
  animation-name: glitch-anim-2;
}
.imgloaded .glitch__img:nth-child(4) {
  background-color: var(--blend-color-4);
  background-blend-mode: var(--blend-mode-4);
  animation-name: glitch-anim-3;
}
.imgloaded .glitch__img:nth-child(5) {
  background-color: var(--blend-color-5);
  background-blend-mode: var(--blend-mode-5);
  animation-name: glitch-anim-flash;
}
@media screen and (max-width: 450px) {
  .glitch:not(.bg) .glitch__img {
    background-size: 110%;
  }
  .content__title {
    font-size: 3rem;
  }
  .content__desc,
  .content__text {
    display: block;
    font-size: 16px;
    padding: theme('spacing.3') theme('spacing.2');
  }
}
/* Animations */
@keyframes fade-in {
  0%,
  65% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes glitch-anim-1 {
  0% {
    opacity: 1;
    transform: translate3d(var(--gap-horizontal), 0, 0);
    -webkit-clip-path: polygon(0 2%, 100% 2%, 100% 5%, 0 5%);
    clip-path: polygon(0 2%, 100% 2%, 100% 5%, 0 5%);
  }
  2% {
    -webkit-clip-path: polygon(0 15%, 100% 15%, 100% 15%, 0 15%);
    clip-path: polygon(0 15%, 100% 15%, 100% 15%, 0 15%);
  }
  4% {
    -webkit-clip-path: polygon(0 10%, 100% 10%, 100% 20%, 0 20%);
    clip-path: polygon(0 10%, 100% 10%, 100% 20%, 0 20%);
  }
  6% {
    -webkit-clip-path: polygon(0 1%, 100% 1%, 100% 2%, 0 2%);
    clip-path: polygon(0 1%, 100% 1%, 100% 2%, 0 2%);
  }
  8% {
    -webkit-clip-path: polygon(0 33%, 100% 33%, 100% 33%, 0 33%);
    clip-path: polygon(0 33%, 100% 33%, 100% 33%, 0 33%);
  }
  10% {
    -webkit-clip-path: polygon(0 44%, 100% 44%, 100% 44%, 0 44%);
    clip-path: polygon(0 44%, 100% 44%, 100% 44%, 0 44%);
  }
  12% {
    -webkit-clip-path: polygon(0 50%, 100% 50%, 100% 20%, 0 20%);
    clip-path: polygon(0 50%, 100% 50%, 100% 20%, 0 20%);
  }
  14% {
    -webkit-clip-path: polygon(0 70%, 100% 70%, 100% 70%, 0 70%);
    clip-path: polygon(0 70%, 100% 70%, 100% 70%, 0 70%);
  }
  16% {
    -webkit-clip-path: polygon(0 80%, 100% 80%, 100% 80%, 0 80%);
    clip-path: polygon(0 80%, 100% 80%, 100% 80%, 0 80%);
  }
  18% {
    -webkit-clip-path: polygon(0 50%, 100% 50%, 100% 55%, 0 55%);
    clip-path: polygon(0 50%, 100% 50%, 100% 55%, 0 55%);
  }
  20% {
    -webkit-clip-path: polygon(0 70%, 100% 70%, 100% 80%, 0 80%);
    clip-path: polygon(0 70%, 100% 70%, 100% 80%, 0 80%);
  }
  21.9% {
    opacity: 1;
    transform: translate3d(var(--gap-horizontal), 0, 0);
  }
  22%,
  100% {
    opacity: 0;
    transform: translate3d(0, 0, 0);
    -webkit-clip-path: polygon(0 0, 0 0, 0 0, 0 0);
    clip-path: polygon(0 0, 0 0, 0 0, 0 0);
  }
}
@keyframes glitch-anim-2 {
  0% {
    opacity: 1;
    transform: translate3d(calc(-1 * var(--gap-horizontal)), 0, 0);
    -webkit-clip-path: polygon(0 25%, 100% 25%, 100% 30%, 0 30%);
    clip-path: polygon(0 25%, 100% 25%, 100% 30%, 0 30%);
  }
  3% {
    -webkit-clip-path: polygon(0 3%, 100% 3%, 100% 3%, 0 3%);
    clip-path: polygon(0 3%, 100% 3%, 100% 3%, 0 3%);
  }
  5% {
    -webkit-clip-path: polygon(0 5%, 100% 5%, 100% 20%, 0 20%);
    clip-path: polygon(0 5%, 100% 5%, 100% 20%, 0 20%);
  }
  7% {
    -webkit-clip-path: polygon(0 20%, 100% 20%, 100% 20%, 0 20%);
    clip-path: polygon(0 20%, 100% 20%, 100% 20%, 0 20%);
  }
  9% {
    -webkit-clip-path: polygon(0 40%, 100% 40%, 100% 40%, 0 40%);
    clip-path: polygon(0 40%, 100% 40%, 100% 40%, 0 40%);
  }
  11% {
    -webkit-clip-path: polygon(0 52%, 100% 52%, 100% 59%, 0 59%);
    clip-path: polygon(0 52%, 100% 52%, 100% 59%, 0 59%);
  }
  13% {
    -webkit-clip-path: polygon(0 60%, 100% 60%, 100% 60%, 0 60%);
    clip-path: polygon(0 60%, 100% 60%, 100% 60%, 0 60%);
  }
  15% {
    -webkit-clip-path: polygon(0 75%, 100% 75%, 100% 75%, 0 75%);
    clip-path: polygon(0 75%, 100% 75%, 100% 75%, 0 75%);
  }
  17% {
    -webkit-clip-path: polygon(0 65%, 100% 65%, 100% 40%, 0 40%);
    clip-path: polygon(0 65%, 100% 65%, 100% 40%, 0 40%);
  }
  19% {
    -webkit-clip-path: polygon(0 45%, 100% 45%, 100% 50%, 0 50%);
    clip-path: polygon(0 45%, 100% 45%, 100% 50%, 0 50%);
  }
  20% {
    -webkit-clip-path: polygon(0 14%, 100% 14%, 100% 33%, 0 33%);
    clip-path: polygon(0 14%, 100% 14%, 100% 33%, 0 33%);
  }
  21.9% {
    opacity: 1;
    transform: translate3d(calc(-1 * var(--gap-horizontal)), 0, 0);
  }
  22%,
  100% {
    opacity: 0;
    transform: translate3d(0, 0, 0);
    -webkit-clip-path: polygon(0 0, 0 0, 0 0, 0 0);
    clip-path: polygon(0 0, 0 0, 0 0, 0 0);
  }
}
@keyframes glitch-anim-3 {
  0% {
    opacity: 1;
    transform: translate3d(0, calc(-1 * var(--gap-vertical)), 0)
      scale3d(-1, -1, 1);
    -webkit-clip-path: polygon(0 1%, 100% 1%, 100% 3%, 0 3%);
    clip-path: polygon(0 1%, 100% 1%, 100% 3%, 0 3%);
  }
  1.5% {
    -webkit-clip-path: polygon(0 10%, 100% 10%, 100% 9%, 0 9%);
    clip-path: polygon(0 10%, 100% 10%, 100% 9%, 0 9%);
  }
  2% {
    -webkit-clip-path: polygon(0 5%, 100% 5%, 100% 6%, 0 6%);
    clip-path: polygon(0 5%, 100% 5%, 100% 6%, 0 6%);
  }
  2.5% {
    -webkit-clip-path: polygon(0 20%, 100% 20%, 100% 20%, 0 20%);
    clip-path: polygon(0 20%, 100% 20%, 100% 20%, 0 20%);
  }
  3% {
    -webkit-clip-path: polygon(0 10%, 100% 10%, 100% 10%, 0 10%);
    clip-path: polygon(0 10%, 100% 10%, 100% 10%, 0 10%);
  }
  5% {
    -webkit-clip-path: polygon(0 30%, 100% 30%, 100% 25%, 0 25%);
    clip-path: polygon(0 30%, 100% 30%, 100% 25%, 0 25%);
  }
  5.5% {
    -webkit-clip-path: polygon(0 15%, 100% 15%, 100% 16%, 0 16%);
    clip-path: polygon(0 15%, 100% 15%, 100% 16%, 0 16%);
  }
  7% {
    -webkit-clip-path: polygon(0 40%, 100% 40%, 100% 39%, 0 39%);
    clip-path: polygon(0 40%, 100% 40%, 100% 39%, 0 39%);
  }
  8% {
    -webkit-clip-path: polygon(0 20%, 100% 20%, 100% 21%, 0 21%);
    clip-path: polygon(0 20%, 100% 20%, 100% 21%, 0 21%);
  }
  9% {
    -webkit-clip-path: polygon(0 60%, 100% 60%, 100% 55%, 0 55%);
    clip-path: polygon(0 60%, 100% 60%, 100% 55%, 0 55%);
  }
  10.5% {
    -webkit-clip-path: polygon(0 30%, 100% 30%, 100% 31%, 0 31%);
    clip-path: polygon(0 30%, 100% 30%, 100% 31%, 0 31%);
  }
  11% {
    -webkit-clip-path: polygon(0 70%, 100% 70%, 100% 69%, 0 69%);
    clip-path: polygon(0 70%, 100% 70%, 100% 69%, 0 69%);
  }
  13% {
    -webkit-clip-path: polygon(0 40%, 100% 40%, 100% 41%, 0 41%);
    clip-path: polygon(0 40%, 100% 40%, 100% 41%, 0 41%);
  }
  14% {
    -webkit-clip-path: polygon(0 80%, 100% 80%, 100% 75%, 0 75%);
    clip-path: polygon(0 80%, 100% 80%, 100% 75%, 0 75%);
  }
  14.5% {
    -webkit-clip-path: polygon(0 50%, 100% 50%, 100% 51%, 0 51%);
    clip-path: polygon(0 50%, 100% 50%, 100% 51%, 0 51%);
  }
  15% {
    -webkit-clip-path: polygon(0 90%, 100% 90%, 100% 90%, 0 90%);
    clip-path: polygon(0 90%, 100% 90%, 100% 90%, 0 90%);
  }
  16% {
    -webkit-clip-path: polygon(0 60%, 100% 60%, 100% 60%, 0 60%);
    clip-path: polygon(0 60%, 100% 60%, 100% 60%, 0 60%);
  }
  18% {
    -webkit-clip-path: polygon(0 100%, 100% 100%, 100% 99%, 0 99%);
    clip-path: polygon(0 100%, 100% 100%, 100% 99%, 0 99%);
  }
  20% {
    -webkit-clip-path: polygon(0 70%, 100% 70%, 100% 71%, 0 71%);
    clip-path: polygon(0 70%, 100% 70%, 100% 71%, 0 71%);
  }
  21.9% {
    opacity: 1;
    transform: translate3d(0, calc(-1 * var(--gap-vertical)), 0)
      scale3d(-1, -1, 1);
  }
  22%,
  100% {
    opacity: 0;
    transform: translate3d(0, 0, 0);
    -webkit-clip-path: polygon(0 0, 0 0, 0 0, 0 0);
    clip-path: polygon(0 0, 0 0, 0 0, 0 0);
  }
}
@keyframes glitch-anim-text {
  0% {
    transform: translate3d(calc(-1 * var(--gap-horizontal)), 0, 0)
      scale3d(-1, -1, 1);
    -webkit-clip-path: polygon(0 20%, 100% 20%, 100% 21%, 0 21%);
    clip-path: polygon(0 20%, 100% 20%, 100% 21%, 0 21%);
  }
  2% {
    -webkit-clip-path: polygon(0 33%, 100% 33%, 100% 33%, 0 33%);
    clip-path: polygon(0 33%, 100% 33%, 100% 33%, 0 33%);
  }
  4% {
    -webkit-clip-path: polygon(0 44%, 100% 44%, 100% 44%, 0 44%);
    clip-path: polygon(0 44%, 100% 44%, 100% 44%, 0 44%);
  }
  5% {
    -webkit-clip-path: polygon(0 50%, 100% 50%, 100% 20%, 0 20%);
    clip-path: polygon(0 50%, 100% 50%, 100% 20%, 0 20%);
  }
  6% {
    -webkit-clip-path: polygon(0 70%, 100% 70%, 100% 70%, 0 70%);
    clip-path: polygon(0 70%, 100% 70%, 100% 70%, 0 70%);
  }
  7% {
    -webkit-clip-path: polygon(0 80%, 100% 80%, 100% 80%, 0 80%);
    clip-path: polygon(0 80%, 100% 80%, 100% 80%, 0 80%);
  }
  8% {
    -webkit-clip-path: polygon(0 50%, 100% 50%, 100% 55%, 0 55%);
    clip-path: polygon(0 50%, 100% 50%, 100% 55%, 0 55%);
  }
  9% {
    -webkit-clip-path: polygon(0 70%, 100% 70%, 100% 80%, 0 80%);
    clip-path: polygon(0 70%, 100% 70%, 100% 80%, 0 80%);
  }
  9.9% {
    transform: translate3d(calc(-1 * var(--gap-horizontal)), 0, 0)
      scale3d(-1, -1, 1);
  }
  10%,
  100% {
    transform: translate3d(0, 0, 0) scale3d(1, 1, 1);
    -webkit-clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
  }
}
/* Flash */
@keyframes glitch-anim-flash {
  0%,
  5% {
    opacity: 0.2;
    transform: translate3d(var(--gap-horizontal), var(--gap-vertical), 0);
  }
  5.5%,
  100% {
    opacity: 0;
    transform: translate3d(0, 0, 0);
  }
}
</style>
