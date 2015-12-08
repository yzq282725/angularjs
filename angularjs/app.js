(function(angular) {

angular
    .module('app', ['ngSlidedeck', 'ui.codemirror', 'ja.qr'])
    .value('isDev', false)
    .controller('mainCtrl', MainCtrl)
    .controller('demoCtrl', DemoCtrl)
    .provider('taskManager', TaskManagerProvider)
;

var taskManagerProvider;

function DemoCtrl($scope, taskManager) {
    $scope.colorOptions = taskManager.colorOptions();
    $scope.tasks        = taskManager.tasks();
    $scope.add          = addTask;
    $scope.newTask      = {
        color: $scope.colorOptions[0],
        content: ''
    };

    function addTask() {
        taskManager.addTask(angular.copy($scope.newTask));
        $scope.newTask.content = '';
    }
}

function TaskManagerProvider() {
    taskManagerProvider = this;
    this.$get           = TaskManager;
    this.taskColors     = [
        'success',
        'info',
        'danger',
        'warning'
    ];
}

function TaskManager() {
    var service = {
        addTask: addTask,
        colorOptions: colorOptions,
        tasks: tasks
    };
    var taskStorage = [];
    return service;

    function colorOptions() {
        return taskManagerProvider.taskColors;
    }

    function addTask(task) {
        task.isClose = false;
        taskStorage.push(task);
    }

    function tasks() {
        return taskStorage;
    }
}

function MainCtrl($scope, $window, isDev) {
    $scope.play = isDev ? true : false;
    $scope.begin = function() {
        if(!isDev) {
            launchFullScreen($window.document.documentElement);
        }
        $scope.play = true;
    }

    $scope.editorOptions = {
        theme:'twilight',
        lineWrapping : true,
        lineNumbers: true,
        readOnly: 'nocursor',
        mode: 'xml',
    };
    $scope.jsEditorOptions = angular.copy($scope.editorOptions);
    $scope.jsEditorOptions.mode = 'javascript';

    function launchFullScreen(element) {
        if(element.requestFullscreen) {
            element.requestFullscreen();
        } else if(element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if(element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if(element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    }
}

})(window.angular);
