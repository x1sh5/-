Component({
  properties: {
    show: {
      type: Boolean,
      value: false,
    },
  },

  methods: {
    handleRegisterClick() {
      this.triggerEvent('register');
    },

    handleCloseClick() {
      this.triggerEvent('close');
    },
  },
});