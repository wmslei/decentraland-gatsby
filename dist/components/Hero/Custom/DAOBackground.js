"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var THREE = __importStar(require("three/src/Three"));
var EffectComposer_1 = require("three/examples/jsm/postprocessing/EffectComposer");
var RenderPass_1 = require("three/examples/jsm/postprocessing/RenderPass");
var UnrealBloomPass_1 = require("three/examples/jsm/postprocessing/UnrealBloomPass");
var SingletonListener_1 = __importDefault(require("../../../utils/dom/SingletonListener"));
function render(ref) {
    var canvas = ref.current;
    if (!canvas) {
        return;
    }
    // Three JS Template
    var params = {
        exposure: 1,
        bloomStrength: 3,
        bloomThreshold: 0.8,
        bloomRadius: 0.5,
    };
    var manaShape = 6;
    var particleMaterials = [
        new THREE.MeshPhysicalMaterial({
            color: 0x98dcec,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0,
        }),
        new THREE.MeshPhysicalMaterial({
            color: 0xbfffff,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0,
        }),
        new THREE.MeshPhysicalMaterial({
            color: 0x04ffff,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0,
        }),
    ];
    var renderer = null;
    try {
        renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvas });
    }
    catch (err) {
        console.error(err);
    }
    if (!renderer) {
        return;
    }
    renderer.setSize(canvas.parentElement.clientWidth, canvas.parentElement.clientHeight);
    renderer.shadowMap.enabled = false;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.shadowMap.needsUpdate = true;
    var camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 500);
    var scene = new THREE.Scene();
    var cameraRange = 3;
    var setcolor = 0x000000;
    scene.background = new THREE.Color(setcolor);
    scene.fog = new THREE.Fog(setcolor, 2.5, 3.5);
    var renderScene = new RenderPass_1.RenderPass(scene, camera);
    var bloomPass = new UnrealBloomPass_1.UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
    bloomPass.threshold = params.bloomThreshold;
    bloomPass.strength = params.bloomStrength;
    bloomPass.radius = params.bloomRadius;
    var composer = new EffectComposer_1.EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);
    //-------------------------------------------------------------- SCENE
    var sceneGruop = new THREE.Object3D();
    var particularGruop = new THREE.Object3D();
    var modularGruop = new THREE.Object3D();
    function generateParticle(num, amp) {
        if (amp === void 0) { amp = 2; }
        var gparticular = new THREE.CircleGeometry(0.25, manaShape);
        for (var i = 1; i < num; i++) {
            var pscale = 0.02; //+ Math.abs(mathRandom(0.05));
            var particular = new THREE.Mesh(gparticular, particleMaterials[Math.floor(Math.random() * particleMaterials.length)]);
            particular.position.set(mathRandom(amp), mathRandom(amp), mathRandom(amp));
            // particular.rotation.set(mathRandom(), mathRandom(), mathRandom());
            particular.scale.set(pscale, pscale, pscale);
            particular.speedValue = mathRandom(0.5);
            particularGruop.add(particular);
            particularGruop.scale.x = 0.2;
            particularGruop.scale.y = 0.2;
            particularGruop.scale.z = 0.2;
        }
    }
    generateParticle(3000, 2);
    sceneGruop.add(particularGruop);
    scene.add(modularGruop);
    scene.add(sceneGruop);
    function mathRandom(num) {
        if (num === void 0) { num = 1; }
        var setNumber = -Math.random() * num + Math.random() * num;
        return setNumber;
    }
    //------------------------------------------------------------- CAMERA
    camera.position.set(0, 0, cameraRange);
    //------------------------------------------------------------- SCENE
    var ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);
    var light = new THREE.SpotLight(0xffffff, 1);
    light.position.set(5, 5, 2);
    var lightBack = new THREE.PointLight(0x0fffff, 5);
    lightBack.position.set(0, -3, -1);
    scene.add(sceneGruop);
    scene.add(light);
    scene.add(lightBack);
    //------------------------------------------------------------- RENDER
    var position = { top: 0, left: 0 };
    function animate() {
        if (!ref.current) {
            return;
        }
        // var time = performance.now() * 0.0003;
        requestAnimationFrame(animate);
        var maxSize = 1.5;
        var mult = maxSize - particularGruop.scale.x;
        if (mult > maxSize)
            mult = maxSize;
        else if (mult < 0)
            mult = 0;
        if (particularGruop.scale.x < maxSize) {
            particularGruop.scale.x += mult * 0.014;
            particularGruop.scale.y += mult * 0.014;
            particularGruop.scale.z += mult * 0.014;
        }
        var maxOpacity = 1;
        var currentOpacity = particleMaterials[0].opacity;
        if (currentOpacity < maxOpacity) {
            particleMaterials.forEach(function (material) {
                if (material.opacity < maxOpacity) {
                    material.opacity += mult * 0.05;
                }
            });
        }
        //---
        for (var i = 0, l = particularGruop.children.length; i < l; i++) {
            var newObject = particularGruop.children[i];
            newObject.rotation.x += newObject.speedValue / 10;
            newObject.rotation.y += newObject.speedValue / 10;
            newObject.rotation.z += newObject.speedValue / 10;
            // console.log(newObject.rotation);
        }
        //---
        particularGruop.rotation.z += 0.0025 * position.top;
        particularGruop.rotation.y += 0.0025 * position.left;
        particularGruop.rotation.x += 0.0025 * ((position.top + position.left) / 2);
        camera.lookAt(scene.position);
        composer.render();
    }
    animate();
    //------------------------------------------------------------- DOM EVENTS
    function onWindowResize() {
        if (!ref.current || !renderer) {
            return;
        }
        camera.aspect = ref.current.width / ref.current.height;
        camera.updateProjectionMatrix();
        renderer.setSize(ref.current.parentElement.clientWidth, ref.current.parentElement.clientHeight);
    }
    function onMouseMove(event) {
        if (event.target) {
            var w = Math.floor(event.target.width / 2);
            var h = Math.floor(event.target.height / 2);
            position.top = -(event.clientY - h) / h;
            position.left = (event.clientX - w) / w;
        }
    }
    var windowListener = SingletonListener_1.default.from(window);
    var canvasListener = SingletonListener_1.default.from(canvas);
    windowListener.addEventListener('resize', onWindowResize);
    canvasListener.addEventListener('mousemove', onMouseMove);
    return function () {
        windowListener.removeEventListener('resize', onWindowResize);
        canvasListener.removeEventListener('mousemove', onMouseMove);
    };
}
function DAOBackground() {
    var ref = react_1.useRef(null);
    react_1.useEffect(function () { return render(ref); }, []);
    return (react_1.default.createElement("canvas", { ref: ref, style: {
            display: 'block',
            width: '100%',
            height: '100%',
        } }));
}
exports.default = DAOBackground;
