const app = Vue.createApp({
  data() {
    return {
      courseGoal: "lol",
      data: null,
      seen: false,
      search: "",
      power: "",
      trips: 0,
      menuSelected: false,
      filterSelected: false,
    };
  },
  methods: {
    toggleMenu() {
      this.menuSelected = !this.menuSelected;
    },
    toggleFilter() {
      this.filterSelected = !this.filterSelected;
    },
  },
  watch: {},
  computed: {
    showNav() {
      return { show: this.menuSelected };
    },
    showUser() {
      return { hide: this.menuSelected };
    },
    showFilter() {
      return { "filter-show": this.filterSelected };
    },
  },
});

app.component("vehicle-listings", {
  props: {
    updateSearch: {
      type: String,
    },
    updateTrips: {},
    updatePower: {},
  },
  template: `
  <div class="data__card fadeInOut" v-for="data in filteredCars" >
        <div class="data__card--image">
          <img
            src="/assets/images/car-photo.jpg"
            alt=""
            class="data__card--profile"
          />
          <p class="data__card--name">
            {{data.name}}<span class="data__card--id">#{{data.id}}</span>
          </p>
        </div>
        <p class="data__card--model">{{data.model}}</p>
        <p class="data__card--date">{{data.service_due}}</p>
        <p class="data__card--trips">{{data.trips}}</p>
        <p class="data__card--power">{{data.energy_usage}}</p>
        <p class="data__card--manage">Manage</p>
      </div>`,
  data() {
    return {
      recievedData: [],
    };
  },
  mounted() {
    axios
      .get("https://www.afrihost.com/resources/fedev/mid/")
      .then((response) => (this.recievedData = response.data.vehicles))
      .catch(function (error) {
        console.log("error" + error);
      });
  },
  computed: {
    filteredCars: function () {
      let filteredData = this.recievedData.filter((car) => {
        return car.model.match(this.updateSearch);
      });
      filteredData = filteredData.filter(
        (car) => car.trips >= this.updateTrips
      );
      filteredData = filteredData.filter((car) => {
        if (car.energy_usage >= this.updatePower) {
          return car;
        }
      });
      return filteredData;
    },
  },
});

app.mount("#app");
