<template>
<v-container>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="firstname"
      :counter="10"
      :rules="firstnameRules"
      label="First Name"
      required
    ></v-text-field>
    <v-text-field
      v-model="lastname"
      :counter="10"
      :rules="lastnameRules"
      label="Last Name"
      required
    ></v-text-field>

    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      required
    ></v-text-field>
    <v-text-field
      v-model="subject"
      :rules="subjectRules"
      label="Subject"
      required
    ></v-text-field>
    <v-textarea
      v-model="description"
      :rules="descriptionRules"
      label="Description"
      required
    ></v-textarea>
    <v-btn
      color="error"
      class="mr-4"
      @click="reset"
    >
      Reset Form
    </v-btn>
    <v-btn
      color="success"
      class="mr-4"
      @click="SubmitForm"
    >
      Submit
    </v-btn>
  </v-form>
  </v-container>
</template>
<script>
import Contact from "../services/Contact";

  export default {
    data: () => ({
      valid: true,
      firstname: '',
      firstnameRules: [
        v => !!v || 'First name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      lastname: '',
      lastnameRules: [
        v => !!v || 'Last name is required',
        v => (v && v.length <= 10) || 'Last name must be less than 10 characters',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      subject: '',
      subjectRules: [
        v => !!v || 'Subject is required',
      ],
      description: '',
      descriptionRules: [
        v => !!v || 'Description is required',
      ],
    }),

    methods: {
    SubmitForm() {
      var data = {
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        subject: this.subject,
        description: this.description,
      };

      Contact.create(data)
        .then(response => {
          this.contact.id = response.data.id;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
      reset () {
        this.$refs.form.reset()
      },
    },
  }
</script>