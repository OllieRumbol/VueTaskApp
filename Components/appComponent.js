var eventBus = new Vue();

//Vue root component
var app = new Vue({
    el: '#app',
    template:
        `
    <div class="container-fluid">
        <h1 class="display-4 font-weight-bold">Tasks</h1>
        <p class="lead">Create all the tasks for your day here.</p>
        <div class="row">
            <div class="col-12">
                <input-component></input-component>
            </div>
        </div>
        <br></br>
        <lists-component></lists-component>
    </div>
    
    `,
    data: {

    },
    methods: {

    },
});

