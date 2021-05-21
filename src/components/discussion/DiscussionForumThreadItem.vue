<template>
  <div class="posts__item">
    <div class="posts__section-left">
      <div class="posts__topic">
        <div class="posts__content">
          <a @click="navigateToThread(t.thread_id)">
            <h3 class="posts__title">
              {{ displayedSubject }}
            </h3>
          </a>
          <p>
            {{ displayedThreadContent }}
          </p>
        </div>
      </div>
      <div class="posts__content">Quiz {{ t.quiz_id }}</div>
    </div>
    <div class="posts__section-right">
      <div class="posts__users js-dropdown">
        <div>
          <a href="#" class="avatar"
            ><img
              src="./fonts/icons/avatars/B.svg"
              alt="avatar"
              data-dropdown-btn="user-b"
          /></a>
          <div
            class="posts__users-dropdown dropdown dropdown--user dropdown--reverse-y"
            data-dropdown-list="user-b"
          >
            <div class="dropdown__user">
              <a href="#" class="dropdown__user-label bg-218380">B</a>
              <div class="dropdown__user-nav">
                <a href="#"><i class="icon-Add_User"></i></a>
                <a href="#"><i class="icon-Message"></i></a>
              </div>
              <div class="dropdown__user-info">
                <a href="#">Tesla Motors</a>
                <p>Last post 4 hours ago. Joined Jun 1, 16</p>
              </div>
              <div class="dropdown__user-icons">
                <a href="#"
                  ><img
                    src="./fonts/icons/badges/Intermediate.svg"
                    alt="user-icon"
                /></a>
                <a href="#"
                  ><img src="./fonts/icons/badges/Bot.svg" alt="user-icon"
                /></a>
                <a href="#"
                  ><img
                    src="./fonts/icons/badges/Animal_Lover.svg"
                    alt="user-icon"
                /></a>
              </div>
              <div class="dropdown__user-statistic">
                <div>Threads - <span>1184</span></div>
                <div>Posts - <span>5,863</span></div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <a href="#" class="avatar"
            ><img src="./fonts/icons/avatars/K.svg" alt="avatar"
          /></a>
        </div>
        <div>
          <a href="#" class="avatar"
            ><img src="./fonts/icons/avatars/O.svg" alt="avatar"
          /></a>
        </div>
      </div>
      <div class="posts__replies">{{ t.replies }}</div>
      <div class="posts__activity">{{ displayedLastActivity }} ago</div>
    </div>
  </div>
</template>

<script>
import { truncate, timeSince } from "../common/helper";

export default {
  props: ["t"],
  computed: {
    displayedSubject() {
      return this.truncate(this.t.subject, 80);
    },
    displayedThreadContent() {
      return this.truncate(this.t.content, 80);
    },
    displayedLastActivity() {
      return this.timeSince(new Date(this.t.last_activity));
    },
  },
  methods: {
    navigateToThread: function (threadId) {
      this.$router.push({
        name: "threads.index",
        params: { id: threadId },
      });
    },
  },
  created() {
    this.truncate = truncate;
    this.timeSince = timeSince;
  },
};
</script>

<style scoped>
body {
  font-family: "Nunito Sans", sans-serif;
  font-size: 16px;
  line-height: 1.75;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #ffffff;
}
main {
  min-height: 400px;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: 700;
}
h1 {
  font-size: 60px;
  line-height: 1.216;
}
h2 {
  font-size: 60px;
  line-height: 1.216;
}
h3 {
  font-size: 44px;
  line-height: 1.272;
}
h4 {
  font-size: 30px;
  line-height: 1.4;
}
h5 {
  font-size: 22px;
  line-height: 1.41;
}
h6 {
  font-size: 18px;
  line-height: 1.555;
}
label {
  font-weight: 400;
  margin: 0;
}
img {
  max-width: 100%;
  height: auto;
  image-rendering: auto;
}
a {
  display: -moz-inline-box;
  display: -ms-inline-flexbox;
  display: -webkit-inline-flex;
  display: inline-flex;
  -webkit-tap-highlight-color: transparent;
  -webkit-transition: color 0.4s;
  -moz-transition: color 0.4s;
  -ms-transition: color 0.4s;
  -o-transition: color 0.4s;
  transition: color 0.4s;
}
a:hover,
a:visited,
a:active,
a:link {
  text-decoration: none;
}
ul,
ol {
  list-style: none;
  padding: 0;
  margin: 0;
}
[class^="icon-"] {
  display: -moz-inline-box;
  display: -ms-inline-flexbox;
  display: -webkit-inline-flex;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}
[class^="icon-"]::before {
  margin: 0;
}
.f--12 {
  font-size: 12px !important;
}
.f--14 {
  font-size: 14px !important;
}
.f--16 {
  font-size: 16px !important;
}
.f--18 {
  font-size: 18px !important;
}
.f--20 {
  font-size: 20px !important;
}
.f--22 {
  font-size: 22px !important;
}
.f--24 {
  font-size: 24px !important;
}
.f--26 {
  font-size: 26px !important;
}
.f--28 {
  font-size: 28px !important;
}
.f--30 {
  font-size: 30px !important;
}
.fw--light {
  font-weight: 300 !important;
}
.fw--regular {
  font-weight: 400 !important;
}
.fw--semi-bold {
  font-weight: 600 !important;
}
.fw--bold {
  font-weight: 700 !important;
}
.fw--extra-bold {
  font-weight: 800 !important;
}
.text--line-through {
  text-decoration: line-through !important;
}
.text--underline {
  text-decoration: underline !important;
}
.text--italic {
  font-style: italic !important;
}
.mt--10 {
  margin-top: 10px !important;
}
.mt--20 {
  margin-top: 20px !important;
}
.mt--30 {
  margin-top: 30px !important;
}
.mt--40 {
  margin-top: 40px !important;
}
.mt--50 {
  margin-top: 50px !important;
}
.mt--60 {
  margin-top: 60px !important;
}
.mt--70 {
  margin-top: 70px !important;
}
.mt--80 {
  margin-top: 80px !important;
}
.mt--90 {
  margin-top: 90px !important;
}
.mt--100 {
  margin-top: 100px !important;
}
.mt--110 {
  margin-top: 110px !important;
}
.mt--120 {
  margin-top: 120px !important;
}
.mt--130 {
  margin-top: 130px !important;
}
.mt--140 {
  margin-top: 140px !important;
}
.mt--150 {
  margin-top: 150px !important;
}
.mt--200 {
  margin-top: 200px !important;
}
.mt--300 {
  margin-top: 300px !important;
}
.mb--10 {
  margin-bottom: 10px !important;
}
.mb--20 {
  margin-bottom: 20px !important;
}
.mb--30 {
  margin-bottom: 30px !important;
}
.mb--40 {
  margin-bottom: 40px !important;
}
.mb--50 {
  margin-bottom: 50px !important;
}
.mb--60 {
  margin-bottom: 60px !important;
}
.mb--70 {
  margin-bottom: 70px !important;
}
.mb--80 {
  margin-bottom: 80px !important;
}
.mb--90 {
  margin-bottom: 90px !important;
}
.mb--100 {
  margin-bottom: 100px !important;
}
.mb--110 {
  margin-bottom: 110px !important;
}
.mb--120 {
  margin-bottom: 120px !important;
}
.mb--130 {
  margin-bottom: 130px !important;
}
.mb--140 {
  margin-bottom: 140px !important;
}
.mb--150 {
  margin-bottom: 150px !important;
}
.mb--200 {
  margin-bottom: 200px !important;
}
.mb--300 {
  margin-bottom: 300px !important;
}
.m--center {
  margin-left: auto !important;
  margin-right: auto !important;
}
@media only screen and (min-width: 1040px) {
  [data-visible="mobile"] {
    display: none !important;
  }
}
@media only screen and (max-width: 1039px) {
  [data-visible="desktop"] {
    display: none !important;
  }
}
input[type="checkbox"],
input[type="radio"] {
  margin: 0;
}
input {
  margin: 0;
}
.message-input {
  position: relative;
}
.message-input__strong {
  position: absolute;
  height: 22px;
  padding: 0 8px;
  margin-top: -11px;
  top: 50%;
  right: 0;
  border-radius: 3px;
  background-color: #3cb878;
  color: #ffffff;
  align-items: center;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
}
@media only screen and (max-width: 1039px) {
  .message-input__strong {
    display: none;
  }
}
label.custom-checkbox {
  position: relative;
  display: inline-block;
  vertical-align: -4px;
  background-color: #e9ecee;
  cursor: pointer;
  width: 18px;
  height: 18px;
}
label.custom-checkbox i {
  display: none;
  position: absolute;
  width: 6px;
  height: 9px;
  top: 50%;
  left: 50%;
  margin-left: -3px;
  margin-top: -6px;
  border-bottom: solid 2px #5b6065;
  border-right: solid 2px #5b6065;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  transform: rotate(45deg);
}
label.custom-checkbox input {
  display: none;
}
label.custom-checkbox input:checked + i {
  display: block;
}
label.custom-radio {
  position: relative;
  display: inline-block;
  vertical-align: -4px;
  background-color: #e9ecee;
  border-radius: 50%;
  cursor: pointer;
  width: 18px;
  height: 18px;
}
label.custom-radio i {
  display: none;
  position: absolute;
  width: 8px;
  height: 8px;
  top: 50%;
  left: 50%;
  margin-left: -4px;
  margin-top: -4px;
  border-radius: 50%;
  background-color: #5b6065;
}
label.custom-radio input {
  display: none;
}
label.custom-radio input:checked + i {
  display: block;
}
select {
  height: 38px;
  border: none;
  outline: none;
  background-color: #e9ecee;
}
@media only screen and (min-width: 1040px) {
  select {
    padding: 0 40px 0 15px;
  }
}
@media only screen and (max-width: 1039px) {
  select {
    padding: 0 30px 0 8px;
    font-size: 13px;
  }
}
.custom-select {
  position: relative;
}
.custom-select select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
.custom-select::after {
  content: "";
  position: absolute;
  display: block;
  margin-top: -5px;
  top: 50%;
  border-bottom: solid 1px #81858a;
  border-right: solid 1px #81858a;
  width: 7px;
  height: 7px;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  transform: rotate(45deg);
}
.dropdown {
  display: none;
  position: absolute;
  padding: 20px 0;
  top: 100%;
  left: 0;
  font-size: 16px;
  background-color: #ffffff;
  flex-direction: column;
  z-index: 1;
}
@media only screen and (max-width: 1039px) {
  .dropdown {
    width: 100%;
    max-width: 100%;
  }
}
.dropdown.dropdown--open {
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
}
.dropdown > * {
  padding-left: 30px;
  padding-right: 30px;
}
.dropdown.dropdown--design-01:not(.dropdown--reverse-y) {
  border-top: solid 1px #f9bc64;
  -webkit-box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.08);
  -moz-box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.08);
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.08);
}
.dropdown.dropdown--design-01.dropdown--reverse-y {
  border-bottom: solid 1px #f9bc64;
  -webkit-box-shadow: 0px -1px 2px 0px rgba(0, 0, 0, 0.08);
  -moz-box-shadow: 0px -1px 2px 0px rgba(0, 0, 0, 0.08);
  box-shadow: 0px -1px 2px 0px rgba(0, 0, 0, 0.08);
}
.dropdown.dropdown--design-01 > div:not(.dropdown__user):not(:first-of-type) {
  margin-top: 26px;
  padding-top: 20px;
  border-top: solid 1px #e9ecee;
}
.dropdown h3 {
  margin: 6px 0 15px;
  font-size: 14px;
}
.dropdown__catalog {
  margin-bottom: -4px;
}
.dropdown__catalog li {
  margin-bottom: 4px;
}
.dropdown__icons {
  margin-top: 6px;
  justify-content: space-between;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
}
.dropdown__icons i {
  font-size: 18px;
}
.dropdown.dropdown--user {
  padding: 37px 10px 10px;
  top: auto;
  bottom: calc(100% + 20px);
  left: -46px;
  background-color: transparent;
}
.dropdown.dropdown--user.dropdown--reverse-y {
  top: calc(100% + 20px);
  bottom: auto;
}
.dropdown__user {
  position: relative;
  padding: 30px 30px 24px;
  background-color: #ffffff;
  -webkit-box-shadow: 0px 8px 10px 3px rgba(0, 0, 0, 0.04);
  -moz-box-shadow: 0px 8px 10px 3px rgba(0, 0, 0, 0.04);
  box-shadow: 0px 8px 10px 3px rgba(0, 0, 0, 0.04);
}
.dropdown__user::after {
  content: "";
  position: absolute;
  display: block;
  border: solid 15px transparent;
  border-top-color: #ffffff;
  bottom: -30px;
  left: 38px;
}
.dropdown__user-label {
  position: absolute;
  padding: 0;
  margin-top: -37px;
  margin-left: -37px;
  top: 0;
  left: 50%;
  font-size: 28px;
  font-weight: 700;
  border-radius: 50%;
  background-color: #f2f4f6;
  width: 74px;
  height: 74px;
  justify-content: center;
  align-items: center;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
}
.dropdown__user-label,
.dropdown__user-label:visited,
.dropdown__user-label:active,
.dropdown__user-label:link {
  color: #ffffff;
}
.dropdown__user-nav {
  justify-content: space-between;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
}
.dropdown__user-nav i {
  font-size: 18px;
  color: #5c6166;
}
.dropdown__user-info {
  padding-top: 10px;
  margin-top: 0;
  text-align: center;
}
.dropdown__user-info a {
  font-size: 18px;
  font-weight: 700;
}
.dropdown__user-info a,
.dropdown__user-info a:visited,
.dropdown__user-info a:active,
.dropdown__user-info a:link {
  color: #394047;
}
.dropdown__user-info p {
  margin: 0;
  font-size: 14px;
  color: #8e9091;
}
.dropdown__user-icons a {
  display: block;
  width: 48px;
  margin: 0 15px;
}
.dropdown__user-statistic div {
  margin: 0 7.5px;
  font-size: 14px;
}
.dropdown__user-statistic div span {
  color: #8e9091;
}
.dropdown__user-icons,
.dropdown__user-statistic {
  position: relative;
  padding-top: 24px;
  margin-top: 22px;
  justify-content: center;
  align-items: center;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
}
.dropdown__user-icons::before,
.dropdown__user-statistic::before {
  content: "";
  position: absolute;
  display: block;
  width: 100%;
  max-width: 180px;
  top: 0;
  border-top: solid 1px #e9ecee;
}
.dropdown.dropdown--user.dropdown--reverse-y .dropdown__user::after {
  display: none;
}
.tags {
  margin-bottom: -6px;
  flex-wrap: wrap;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
}
.tags a {
  margin-bottom: 6px;
  background-color: #394047;
  justify-content: center;
  align-items: center;
  display: -moz-inline-box;
  display: -ms-inline-flexbox;
  display: -webkit-inline-flex;
  display: inline-flex;
}
.tags a,
.tags a:visited,
.tags a:active,
.tags a:link {
  color: #ffffff;
}
@media only screen and (min-width: 1040px) {
  .tags a {
    height: 22px;
    padding: 0 8px;
    border-radius: 3px;
  }
}
@media only screen and (max-width: 1039px) {
  .tags a {
    height: 28px;
    padding: 0 10px;
    font-size: 14px;
  }
}
.tags a:not(:last-child) {
  margin-right: 6px;
}
.category i {
  margin-right: 10px;
  margin-top: 10px;
  border-radius: 50%;
  background-color: #e9ecee;
  width: 8px;
  height: 8px;
}
.avatar {
  position: relative;
  display: block;
  width: 32px;
}
.avatar span {
  height: 18px;
  padding: 0 5px;
  position: absolute;
  top: -9px;
  right: -7px;
  font-size: 12px;
  border-radius: 3px;
  background-color: #4c5359;
  color: #ffffff;
  justify-content: center;
  align-items: center;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
}
.nav {
  position: relative;
  border-bottom: solid #e9ecee;
  flex-wrap: wrap;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
}
@media only screen and (max-width: 1039px) {
  .nav {
    padding-bottom: 15px;
    border-width: 2px;
  }
}
@media only screen and (max-width: 1039px) {
  .nav {
    border-width: 1px;
  }
}
.nav__categories {
  align-items: center;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
}
@media only screen and (min-width: 1040px) {
  .nav__categories {
    padding: 15px 0;
  }
}
@media only screen and (max-width: 1039px) {
  .nav__categories {
    padding-top: 15px;
  }
}
.nav__categories > * {
  margin-right: 15px;
}
@media only screen and (min-width: 1040px) {
  .nav__select {
    position: relative;
  }
}
@media only screen and (min-width: 1040px) {
  .nav [data-dropdown-list="categories"] {
    min-width: 350px;
  }
}
@media only screen and (min-width: 1040px) {
  .nav [data-dropdown-list="tags"] {
    min-width: 350px;
  }
}
@media only screen and (min-width: 1040px) {
  .nav__menu {
    margin-left: 15px;
  }
}
@media only screen and (max-width: 1039px) {
  .nav__menu {
    padding-top: 15px;
  }
}
.nav__menu > ul {
  height: 100%;
  margin: 0 -15px;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
}
@media only screen and (max-width: 1039px) {
  .nav__menu > ul {
    display: none;
  }
}
.nav__menu > ul li {
  padding: 0 15px;
}
.nav__menu > ul li a {
  position: relative;
  height: 100%;
  line-height: 1.2;
  align-items: center;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
}
.nav__menu > ul li.active a,
.nav__menu > ul li.active a:visited,
.nav__menu > ul li.active a:active,
.nav__menu > ul li.active a:link {
  color: #394047;
}
.nav__menu > ul li.active a::before {
  content: "";
  position: absolute;
  width: 100%;
  bottom: -2px;
  left: 0;
  border-bottom: solid 2px #f9bc64;
}
@media only screen and (min-width: 1040px) {
  .nav__menu .nav__select {
    display: none;
  }
}
.nav__thread {
  margin-left: auto;
  align-items: center;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
}
@media only screen and (min-width: 1040px) {
  .nav__thread {
    padding: 15px 0;
  }
}
@media only screen and (max-width: 1039px) {
  .nav__thread {
    display: none;
  }
}
.nav__thread p {
  margin: 0 15px 0 0;
  color: #8e9091;
}
@media only screen and (max-width: 1249px) {
  .nav__thread p {
    display: none;
  }
}
.nav__thread-btn {
  height: 38px;
  background-color: #e9ecee;
  align-items: center;
  cursor: pointer;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
}
.nav__thread-btn,
.nav__thread-btn:visited,
.nav__thread-btn:active,
.nav__thread-btn:link {
  color: #394047;
}
@media only screen and (min-width: 1040px) {
  .nav__thread-btn {
    padding: 0 15px;
  }
}
@media only screen and (max-width: 1039px) {
  .nav__thread-btn {
    padding: 0 8px;
    font-size: 13px;
  }
}
.nav__thread-btn--prev {
  margin-right: 15px;
}
.nav__thread-btn--prev i {
  margin-right: 15px;
  color: #394047;
}
.nav__thread-btn--next i {
  margin-left: 15px;
}
.posts__head,
.posts__item {
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
}
.posts__head > *,
.posts__item > * {
  align-items: center;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
}
.posts__head {
  padding-top: 20px;
  padding-bottom: 20px;
  font-size: 14px;
}
.posts__body {
  border: solid 1px #f3f4f5;
}
.posts__item {
  background-color: #ffffff;
}
@media only screen and (min-width: 1040px) {
  .posts__item {
    padding: 24px 0;
  }
}
@media only screen and (max-width: 1039px) {
  .posts__item {
    padding: 15px 0;
  }
}
@media only screen and (min-width: 1040px) {
  .posts__item.posts__item--bg-gradient {
    background-image: url("./images/topic-bg-gradient.jpg");
    background-size: cover;
  }
}
@media only screen and (max-width: 1039px) {
  .posts__item.posts__item--bg-gradient {
    background-color: #f2f4f6;
  }
}
.posts__section-left,
.posts__section-right {
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
}
@media only screen and (min-width: 1040px) {
  .posts__section-left,
  .posts__section-right {
    align-items: center;
  }
}
@media only screen and (max-width: 1039px) {
  .posts__section-left,
  .posts__section-right {
    flex-direction: column;
    justify-content: center;
  }
}
.posts__section-left > *,
.posts__section-right > * {
  align-items: center;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
}
@media only screen and (min-width: 1040px) {
  .posts__section-left {
    width: 63%;
    min-width: 63%;
  }
}
@media only screen and (max-width: 1039px) {
  .posts__section-left {
    padding-left: 15px;
    align-items: flex-start;
  }
}
@media only screen and (min-width: 1040px) {
  .posts__section-right {
    width: 37%;
    min-width: 37%;
  }
}
@media only screen and (max-width: 1039px) {
  .posts__section-right {
    padding-right: 15px;
    margin-left: auto;
    align-items: flex-end;
  }
}
@media only screen and (min-width: 1040px) {
  .posts__topic {
    width: 50%;
    min-width: 50%;
  }
}
.posts__item .posts__topic {
  padding-right: 15px;
}
@media only screen and (min-width: 1040px) {
  .posts__item .posts__topic {
    padding-left: 30px;
  }
}
@media only screen and (min-width: 1040px) {
  .posts__section-left .posts__topic {
    width: 79.37%;
    min-width: 79.37%;
  }
}
@media only screen and (min-width: 1040px) {
  .posts__category {
    width: 13%;
    min-width: 13%;
  }
}
@media only screen and (max-width: 1039px) {
  .posts__head .posts__category {
    display: none;
  }
}
@media only screen and (min-width: 1040px) {
  .posts__section-left .posts__category {
    margin-left: auto;
    width: 20.63%;
    min-width: 20.63%;
  }
}
@media only screen and (max-width: 1039px) {
  .posts__section-left .posts__category {
    margin-top: 15px;
  }
}
@media only screen and (min-width: 1040px) {
  .posts__users {
    width: 13%;
    min-width: 13%;
  }
}
@media only screen and (max-width: 1039px) {
  .posts__users {
    display: none !important;
  }
}
.posts__users > div {
  position: relative;
}
.posts__users-dropdown > * {
  width: 320px;
}
.posts__item .posts__users {
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
}
.posts__item .posts__users > *:not(:last-child) {
  margin-right: 6px;
}
@media only screen and (min-width: 1040px) {
  .posts__section-right .posts__users {
    width: 35.13%;
    min-width: 35.13%;
  }
}
@media only screen and (min-width: 1040px) {
  .posts__replies {
    width: 8%;
    min-width: 8%;
  }
}
@media only screen and (max-width: 1039px) {
  .posts__head .posts__replies {
    margin-left: auto;
  }
}
.posts__item .posts__replies {
  font-weight: 600;
}
@media only screen and (min-width: 1040px) {
  .posts__section-right .posts__replies {
    width: 21.62%;
    min-width: 21.62%;
  }
}
@media only screen and (max-width: 1039px) {
  .posts__section-right .posts__replies {
    justify-content: flex-end;
  }
}
.posts__views {
  color: #8e9091;
}
@media only screen and (min-width: 1040px) {
  .posts__views {
    width: 8%;
    min-width: 8%;
  }
}
@media only screen and (max-width: 1039px) {
  .posts__views {
    display: none !important;
  }
}
@media only screen and (min-width: 1040px) {
  .posts__section-right .posts__views {
    width: 21.62%;
    min-width: 21.62%;
  }
}
.posts__activity {
  color: #8e9091;
}
@media only screen and (min-width: 1040px) {
  .posts__activity {
    width: 8%;
    min-width: 8%;
  }
}
@media only screen and (max-width: 1039px) {
  .posts__head .posts__activity {
    display: none !important;
  }
}
@media only screen and (max-width: 1039px) {
  .posts__item .posts__activity {
    padding-top: 4px;
    margin-top: 4px;
    border-top: solid 1px #e9ecee;
  }
}
@media only screen and (min-width: 1040px) {
  .posts__section-right .posts__activity {
    width: 21.62%;
    min-width: 21.62%;
  }
}
@media only screen and (max-width: 1039px) {
  .posts__section-right .posts__activity {
    justify-content: flex-end;
  }
}
@media only screen and (min-width: 1040px) {
  .posts__replies,
  .posts__views,
  .posts__activity {
    justify-content: center;
  }
}
.posts__content h3 {
  margin: 0;
  font-weight: 400;
  font-size: 17px;
  line-height: 1.6;
  color: #394047;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
}
.posts__content h3 span {
  margin-right: 5px;
  color: #8e9091;
}
.posts__content p {
  margin: 0;
  line-height: 1.6;
  color: #8e9091;
}
@media only screen and (max-width: 1039px) {
  .posts__content p {
    display: none;
  }
}
.posts__content i {
  margin-right: 15px;
  vertical-align: -2px;
  font-size: 20px;
  color: #5c6166;
}
.posts__content i img {
  max-width: 16px;
}
.posts__content > * {
  margin: 0;
}
.posts__content > *:not(:first-child) {
  margin-top: 10px;
}
.posts__tags {
  margin-bottom: -6px;
}
@media only screen and (max-width: 1039px) {
  .posts__tags {
    display: none;
  }
}

.posts__title {
  cursor: pointer;
}
</style>