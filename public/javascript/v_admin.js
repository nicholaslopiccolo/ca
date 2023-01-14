Vue.config.devtools = true;

var app = new Vue({
    el: "#adm",
    data: {
      users:[]  
    },
    created(){
        let self = this;
        axios.get('/4dm1n').then(res=>{
            self.users = res.data;
        });
    }
});