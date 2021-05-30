<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card mb-4">
        <div class="card-header">
          <div class="media flex-wrap w-100 align-items-center">
            <img
              :src="`${publicPath}assets/images/avatars/${p.avatarUrl}`"
              class="d-block ui-w-40 rounded-circle"
              alt=""
            />
            <div class="media-body ml-3">
              <a href="javascript:void(0)" data-abc="true">{{ p.full_name }}</a>
              <div class="small">
                {{ displayedPostPostedAt }} ago
              </div>
            </div>
            <div class="small ml-3">
              <div>
                Member since <strong>{{ displayedMemberSince }}</strong>
              </div>
              <div>
                <strong>{{ p.thread_count }}</strong>
                {{ p.thread_count === 1 ? "thread" : "threads" }}
                <strong>{{ p.post_count }}</strong>
                {{ p.post_count === 1 ? "post" : "posts" }}
              </div>
            </div>
          </div>
        </div>
        <div class="card-body text-dark" v-html="p.content"></div>
        <div
          class="card-footer d-flex flex-wrap justify-content-between align-items-center px-0 pt-0 pb-3"
        >
          <div class="px-4 pt-3"></div>
          <div class="px-4 pt-3">
            <button type="button" class="btn btn-primary">
              <i class="ion ion-md-create"></i>&nbsp; Reply
            </button>
            <button @click="deletePost" v-if="isTeacher" type="button" class="btn btn-danger">
              <i class="ion ion-md-create"></i>&nbsp; Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  truncate,
  timeSince,
  convertISOToReadableFormat,
} from "../common/helper";

export default {
  props: ["p"],
  computed: {
    displayedMemberSince() {
      if (this.p.member_since) {
        return this.convertISOToReadableFormat(new Date(this.p.member_since));
      }
      return null;
    },
    displayedPostPostedAt() {
      return this.timeSince(new Date(this.p.posted_at));
    },
    isTeacher() {
      return this.$store.getters["authStore/isTeacher"];
    },
        publicPath() {
      return process.env.BASE_URL
    },
  },
  created() {
    this.truncate = truncate;
    this.timeSince = timeSince;
    this.convertISOToReadableFormat = convertISOToReadableFormat;
  },
  methods: {
    deletePost() {
      
      this.$store
        .dispatch("forumStore/deletePost", { post_id: this.p.post_id })
        .then((response) => {

        });
    },
  },
};
</script>

<style scoped>
.card {
  box-shadow: 0 0.46875rem 2.1875rem rgba(4, 9, 20, 0.03),
    0 0.9375rem 1.40625rem rgba(4, 9, 20, 0.03),
    0 0.25rem 0.53125rem rgba(4, 9, 20, 0.05),
    0 0.125rem 0.1875rem rgba(4, 9, 20, 0.03);
  border-width: 0;
  transition: all 0.2s;
}

.card-header:first-child {
  border-radius: calc(0.25rem - 1px) calc(0.25rem - 1px) 0 0;
}

.card-header {
  display: flex;
  align-items: center;
  border-bottom-width: 1px;
  padding-top: 0;
  padding-bottom: 0;
  padding-right: 0.625rem;
  height: 3.5rem;
  text-transform: uppercase;

  background-color: #6356ca;
  border-bottom: 1px solid rgba(26, 54, 126, 0.125);
}

.btn-primary {
  color: #fff;
  background-color: #3f6ad8;
  border-color: #3f6ad8;
}

.btn {
  font-size: 0.8rem;
  font-weight: 500;
  outline: none !important;
  position: relative;
  transition: color 0.15s, background-color 0.15s, border-color 0.15s,
    box-shadow 0.15s;
}

.card-body {
  flex: 1 1 auto;
  padding: 2rem;
}

.card-body p {
  font-size: 16px;
}

.card-footer {
  background-color: #6356ca;
}

a {
  color: #e91e63;
  text-decoration: none !important;
  background-color: transparent;
}

.media img {
  width: 40px;
  height: auto;
}
</style>