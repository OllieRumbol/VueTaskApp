var eventBus = new Vue();

//Vue root component
var app = new Vue({
    el: '#app',
    data: {
        tasks: []
    },
    methods: {
        addTask: function(task){
            this.tasks.push(task);
        }
    },
});

