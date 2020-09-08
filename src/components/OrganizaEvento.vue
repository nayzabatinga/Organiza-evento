<template>
    <h1>ORGANIZA EVENTO</h1>
    <form id="file"  method="POST">
        <input id="file" ref='file' v-on:change="getFile()" type="file">
        <button type="submit" v-on:click="submitFile()">Organizar Evento</button>
    </form>
</template>

<script>
    import axios from 'axios'
    export default{
        name: 'OrganizaEvento',
        methods: {
            getFile(){
                this.file = this.$refs.file.files[0]
            },
            submitFile(){
                let formData = new FormData()
                formData.append('file', this.file)
            
                axios.post('http://192.168.1.53:1300/api/v1/evento/organizandoEvento', 
                formData,
                {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
              })
                .then( res => console.log('res',res))
                .catch( err => console.log('err',err))
            }
        }
    }
</script>