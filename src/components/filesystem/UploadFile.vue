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


        <div class="dropbox">
          <input type="file" multiple :name="uploadFieldName" :disabled="isSaving" @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length"
            accept="image/*" class="input-file">
            <p v-if="isInitial">
              Drag your file(s) here to begin<br> or click to browse
            </p>
            <p v-if="isSaving">
              Uploading {{ fileCount }} files...
            </p>
        </div>

      <div class="row">
        <UniverseButton text="Create Directory" :click="save" style="float: right;"></UniverseButton>
      </div>
    </form>
</template>

<script>
import UniverseButton from '@/components/gui/UniverseButton'
import api from '@/utils/api'
import { authBus, modalBus, applicationBus } from '../../main';
const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3;

export default {
  name: 'UploadFile',
  data () {
    return {
      auth:false,
      showSettings:false,
      filesystemBus:{},
      collection_id:0,
      privacy:'p',
        fileCount:0,
        uploadedFiles: [],
        uploadError: null,
        currentStatus: null,
        uploadFieldName: 'photos'
    }
  },
  props: ['data'],
  computed: {
      isInitial() {
        return this.currentStatus === STATUS_INITIAL;
      },
      isSaving() {
        return this.currentStatus === STATUS_SAVING;
      },
      isSuccess() {
        return this.currentStatus === STATUS_SUCCESS;
      },
      isFailed() {
        return this.currentStatus === STATUS_FAILED;
      }
  },
  methods:{
    getItems:function(parent_id,cb){
        api.get('directories/'+parent_id,{
        },function(err,result,body){
          if(err){
            console.log(err);
          }
          else{
            cb(body);
          }
          
        });
    },
    init:function(id){
      console.log('open upload file');
      this.reset();
    },
    reset() {
        // reset form to initial state
        this.currentStatus = STATUS_INITIAL;
        this.uploadedFiles = [];
        this.uploadError = null;
    },
    upload(formData) {
      return new Promise(
        (resolve,reject)=>{
          api.post('files',formData,function(err,result,body){
            if(err){
              reject(err);
            }
            else{
              resolve(body);
            }
          });
        });
    },
    filesChange(fieldName, fileList) {
        // handle file changes
        
        const formData = new FormData();
         if (!fileList.length) return;

         console.log('====');
         console.log(fileList);
         console.log('====');

        // append the files to FormData
        Array
          .from(Array(fileList.length).keys())
          .map(x => {
            formData.append(fieldName, fileList[x], fileList[x].name);
          });
          console.log(formData.getAll(fieldName))
        // save it
        this.save(formData);
    },
    save(formData) {
        // upload data to the server
        this.currentStatus = STATUS_SAVING;

        this.upload(formData)
          .then(x => {
            this.uploadedFiles = [].concat(x);
            this.currentStatus = STATUS_SUCCESS;
          })
          .catch(err => {
            this.uploadError = err.response;
            this.currentStatus = STATUS_FAILED;
          });
    },
  },
  mounted: function(){
    let self = this;

    this.init(this.data.collection_id);
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