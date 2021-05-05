<template>
<v-container>
    
  <v-form
    ref="form"
    lazy-validation
  >
    <v-text-field
      v-model="type"
      label="Type"
      required
    ></v-text-field>
    <v-text-field
      v-model="name"
      label="Name"
      required
    ></v-text-field>
    <v-text-field
      v-model="manufacturer"
      label="Manufacturer"
      required
    ></v-text-field>
    <v-text-field
      v-model="description"
      label="Description"
      required
    ></v-text-field>
    <v-text-field
      v-model="stock"
      label="Stock"
      required
    ></v-text-field>
    <v-text-field
      v-model="price"
      label="Price"
      required
    ></v-text-field>
    <v-text-field
      v-model="discount"
      label="Discount"
      required
    ></v-text-field>
    <input class="mr-4" type="file" @change="onFileChange" />
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
      @click="onUploadFile"
      :disabled="!this.selectedFile"
    >
      Submit
    </v-btn>
  </v-form>
  </v-container>
</template>
<script>
import ProductData from "../services/Products";
import axios from "axios";
  export default {
    data: () => ({
      selectedFile: "",
      imgpath: '',
      type:'',
      name: '',
      manufacturer:'',
      description:'',
      stock:'',
      price:'',
      discount:''
    }),

    methods: {
    onFileChange(e) {
      const selectedFile = e.target.files[0]; // accessing file
      this.imgpath= e.target.files[0].name;
      this.selectedFile = selectedFile;
    },
    onUploadFile() {
      var data = {
        imgpath: this.imgpath,
        type: this.type,
        name: this.name,
        manufacturer: this.manufacturer,
        description: this.description,
        stock: this.stock,
        price: this.price,
        discount:this.discount
      };
      const formData = new FormData();
      formData.append("file", this.selectedFile);  // appending file
      
      // Sending product data to the DB
      ProductData.create(data)
        .then(response => {
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });

     // Sending photo to the backend
      axios
        .post("http://localhost:4000/api/Product/upload", formData)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
        },
      reset () {
        this.$refs.form.reset()
      },
    },
  }
</script>