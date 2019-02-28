<template>
    <form class="universeForm" enctype="multipart/form-data" novalidate>
      <div class="row">
        <label>Collection</label>
        <input type="text" placeholder="Title" v-model="collection_id">
      </div>
      <div class="row">
        <label>Privacy</label>
        <input type="text" placeholder="Privacy" v-model="privacy">
      </div>

      <vue2Dropzone ref="uploadDropzone" id="dropzone" :options="dropzoneOptions" v-on:vdropzone-file-added="prepareTempFile" v-on:vdropzone-success="onUploadSuccess"></vue2Dropzone>

      <div class="row">
        <UniverseButton text="Save Files" :click="save" style="float: right;"></UniverseButton>
      </div>
    </form>
</template>

<script>
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import UniverseButton from '@/components/gui/UniverseButton'
import api from '@/utils/api'
import { authBus, modalBus, applicationBus } from '../../main';

export default {
  name: 'UploadFile',
  data () {
    return {
      auth:false,
      showSettings:false,
      filesystemBus:{},
      collection_id:1337,
      privacy:'p',
      dropzoneOptions: {
          url: './api/v1/files/upload/temp',
          thumbnailWidth: 150,
          maxFilesize: 0.5,
          headers: { "collection_id": 0}, 
          autoProcessQueue:false
      },
      fileIndex:0,
      updateFileDuringPreparation:true,
      successfullUploads:[]
    }
  },
  components:{
    UniverseButton,
    vue2Dropzone
  },
  props: ['data'],
  methods:{
    prepareTempFile(file){
      
      //assign file out of dropzone que to new var
      let newFile = this.$refs.uploadDropzone.dropzone.files[this.fileIndex];

      //remove old file
      if(this.updateFileDuringPreparation){
        this.updateFileDuringPreparation = false;
        this.$refs.uploadDropzone.removeFile(file);
        this.$refs.uploadDropzone.addFile(newFile);
      }

      //we can not add form parameters because busbuy prevents post params to be parsed from the body
      this.dropzoneOptions.headers.collection_id = this.collection_id;
      this.dropzoneOptions.headers.privacy = this.privacy;

      this.$refs.uploadDropzone.processQueue();
      this.updateFileDuringPreparation = true;

    },
    onUploadSuccess(file, response){
      console.log('success!');
      console.log(file,response);
      this.successfullUploads.push(response);
    },
    save:function(){

      let self = this;
      let files = [];
      for(let i in this.successfullUploads){
        files.push(this.successfullUploads[i].id)
      }
      api.post('files/savetemp',
         {
          files
         } ,function(err,result,body){
          if(err){
            console.log(err);
          }
          else{
            console.log(body.status);
            if(body.status == 'ok'){
              //close modal
              modalBus.$emit('modal', {});

              //update collection
              self.filesystemBus.collection_id = self.collection_id;
              applicationBus.$emit('filesystem_1', self.filesystemBus);
            }
          }
        });
    },

  },
  mounted: function(){
    let self = this;
    this.collection_id = this.data.collection_id;
    console.log('uploading file to collection #'+this.collection_id);
    console.log(this.data.collection_id);

    //set collection id in dropzone^
    this.dropzoneOptions.headers.collection_id = this.collection_id;

    //this.init(this.data.collection_id);
    applicationBus.$on('filesystem_1', (applicationObj) => {
        self.filesystemBus = applicationObj;
        //bool openDirectoryOnBusUpdate is used to prevent infinte loop when openDirectory execute its set to false
    });
    authBus.$on('auth', (authObj) => {
        if(typeof authObj.jwt != 'undefined'){
          self.auth = true;
        }
    });
    if(localStorage.getItem('jwt')){
      self.auth = true;
    }
  }
}
</script>
<style scoped>
  .dropbox {
    outline: 2px dashed grey; /* the dash box */
    outline-offset: -10px;
    background: lightcyan;
    color: dimgray;
    padding: 10px 10px;
    min-height: 200px; /* minimum height */
    position: relative;
    cursor: pointer;
  }

  .input-file {
    opacity: 0; /* invisible but it's there! */
    width: 100%;
    height: 200px;
    position: absolute;
    cursor: pointer;
  }

  .dropbox:hover {
    background: lightblue; /* when mouse over to the drop zone, change color */
  }

  .dropbox p {
    font-size: 1.2em;
    text-align: center;
    padding: 50px 0;
  }
</style>