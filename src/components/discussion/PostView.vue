<template>
  <div class="container mt-100">
    <div class="row">
      <div class="col-md-12">
        <div class="card mb-4">
          <div class="card-header">
            <div class="media flex-wrap w-100 align-items-center">
              <img
                src="https://res.cloudinary.com/dxfq3iotg/image/upload/v1574583246/AAA/2.jpg"
                class="d-block ui-w-40 rounded-circle"
                alt=""
              />
              <div class="media-body ml-3">
                <a href="javascript:void(0)" data-abc="true">Tom Harry</a>
                <div class="text-muted small">13 days ago</div>
              </div>
              <div class="text-muted small ml-3">
                <div>Member since <strong>01/1/2019</strong></div>
                <div><strong>134</strong> posts</div>
              </div>
            </div>
          </div>
          <div class="card-body">
            <p>
              For me, getting my business website made was a lot of tech
              wizardry things. Thankfully i get an ad on Facebook ragarding
              commence website. I get connected with BBB team. They made my
              stunning website live in just 3 days. With the increase demand of
              online customers. I had to take my business online. BBB Team
              guided me at each step and enabled me to centralise my work and
              have control on all aspect of my online business.
            </p>
            <p>
              For me, getting my business website made was a lot of tech
              wizardry things. Thankfully i get an ad on Facebook ragarding
              commence website. I get connected with BBB team. They made my
              stunning website live in just 3 days. With the increase demand of
              online customers. I had to take my business online. BBB Team
              guided me at each step and enabled me to centralise my work and
              have control on all aspect of my online business.
            </p>
          </div>
          <div
            class="card-footer d-flex flex-wrap justify-content-between align-items-center px-0 pt-0 pb-3"
          >
            <div class="px-4 pt-3"></div>
            <div class="px-4 pt-3">
              <button type="button" class="btn btn-primary">
                <i class="ion ion-md-create"></i>&nbsp; Reply
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="container mt-50 card-body">
    <div class="row">
      <div class="col-md-6"></div>
    </div>
    <div class="create__section create__textarea">
      <textarea class="form-control" id="description" rows="5" placeholder="Type your reply here..."></textarea>
    </div>
    <div
      class="card-footer d-flex flex-wrap justify-content-between align-items-center px-0 pt-0 pb-3"
    >
      <div class="px-4 pt-3"></div>
      <div class="px-4 pt-3">
        <button type="button" class="btn btn-dark">
          <i class="ion ion-md-create"></i>&nbsp; Cancel
        </button>
        <button type="button" class="btn btn-primary">
          <i class="ion ion-md-create"></i>&nbsp; Submit
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style scoped>
.mt-100 {
  margin-top: 100px;
}

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
  background-color: #fff;
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