import * as THREE from 'C:\Github\web_test\three.js-master\build\three.module.js';
class App{
    constructor() {
        const divContainer = document.querySelector("#webgl-container");
        this._divcontainer = divContainer;

        const renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setPixelRatio(window.devicePixelRatio);
        divContainer.appendChild(renderer.domElement);
        this._renderer = renderer;

        const scene = new THREE.Scene();
        this._scene = scene;

        this._setupCamera();
        this._setupLight();
        this._setupModel();

        window.onresize = this.resize.bind(this);
        this.resize();

        requestAnimationFrame(this.render.bind(this));
    }

    _setupCamera() {
        const width = this._divcontainer.clientWidth;
        const height = this._divcontainer.clientHeight;
        const camera = new THREE.PerspectiveCamera(
            75,
            width / height,
            0.1,
            100
        );
        camera.position.z = 2;
        this._camera = camera;
    }

    _setupLight(){
        const color = 0xffffff;
        const intensity =1;
        const light = new THREE.DirectioinalLight(color, intensity);
        light.position.set(-1, 2, 4);
        this._scene.add(light);
    }

    _setupModel(){
        const geometry = new THREE.BoxGeomtry(1, 1, 1);
        const material = new THREE.MeshPhongMeterial({color: 0x44a88});

        const cube = new THREE.Mesh(geometry, material);

        this._scene.add(cube);
        this._cube = cube;
    }
    
    resize(){
        const width = this._divcontainer.clientWidth;
        const height = this._divcontainer.clientHeight;

        this._camera.aspect = width / height;
        this._camera.updateProjectionMatrix();

        this._renderer.setSize(width, height);
    }

    render(time){
        this._renderer.render(this._scene, this._camera);
        this.update(time);
        requestAnimationFrame(this.render.bind(this));
    }

    update(time){
        time *= 0.001; // second unit;
        this._cube.rotation.x = time;
        this._cube.rotation.y = time;
    }
}

window.onload = function(){
    new App();
}