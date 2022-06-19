import * as THREE from 'three';

import { UIPanel, UIRow, UIHorizontalRule } from './libs/ui.js';

import { AddObjectCommand } from './commands/AddObjectCommand.js';

function MenubarAdd(editor) {
  let strings = editor.strings;

  let container = new UIPanel();
  container.setClass('menu');

  let title = new UIPanel();
  title.setClass('title');
  title.setTextContent(strings.getKey('menubar/add'));
  container.add(title);

  let options = new UIPanel();
  options.setClass('options');
  container.add(options);

  let option;
  // Group

  option = new UIRow();
  option.setClass('option');
  option.setTextContent(strings.getKey('menubar/add/group'));
  option.onClick(function () {
    let mesh = new THREE.Group();
    mesh.name = 'Group';

    editor.execute(new AddObjectCommand(editor, mesh));
  });
  options.add(option);

  //

  options.add(new UIHorizontalRule());

  // Box

  option = new UIRow();
  option.setClass('option');
  option.setTextContent(strings.getKey('menubar/add/box'));
  option.onClick(function () {
    let geometry = new THREE.BoxGeometry(1, 1, 1, 1, 1, 1);
    let mesh = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial());
    mesh.name = 'Box';

    editor.execute(new AddObjectCommand(editor, mesh));
  });
  options.add(option);

  // Sphere

  option = new UIRow();
  option.setClass('option');
  option.setTextContent(strings.getKey('menubar/add/sphere'));
  option.onClick(function () {
    let geometry = new THREE.SphereGeometry(
      1,
      32,
      16,
      0,
      Math.PI * 2,
      0,
      Math.PI
    );
    let mesh = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial());
    mesh.name = 'Sphere';

    editor.execute(new AddObjectCommand(editor, mesh));
  });
  options.add(option);

  // Circle

  option = new UIRow();
  option.setClass('option');
  option.setTextContent(strings.getKey('menubar/add/circle'));
  option.onClick(function () {
    let geometry = new THREE.CircleGeometry(1, 8, 0, Math.PI * 2);
    let mesh = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial());
    mesh.name = 'Circle';

    editor.execute(new AddObjectCommand(editor, mesh));
  });
  options.add(option);

  // Cylinder

  option = new UIRow();
  option.setClass('option');
  option.setTextContent(strings.getKey('menubar/add/cylinder'));
  option.onClick(function () {
    let geometry = new THREE.CylinderGeometry(
      1,
      1,
      1,
      8,
      1,
      false,
      0,
      Math.PI * 2
    );
    let mesh = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial());
    mesh.name = 'Cylinder';

    editor.execute(new AddObjectCommand(editor, mesh));
  });
  options.add(option);

  // Dodecahedron

  option = new UIRow();
  option.setClass('option');
  option.setTextContent(strings.getKey('menubar/add/dodecahedron'));
  option.onClick(function () {
    let geometry = new THREE.DodecahedronGeometry(1, 0);
    let mesh = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial());
    mesh.name = 'Dodecahedron';

    editor.execute(new AddObjectCommand(editor, mesh));
  });
  options.add(option);

  // Icosahedron

  option = new UIRow();
  option.setClass('option');
  option.setTextContent(strings.getKey('menubar/add/icosahedron'));
  option.onClick(function () {
    let geometry = new THREE.IcosahedronGeometry(1, 0);
    let mesh = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial());
    mesh.name = 'Icosahedron';

    editor.execute(new AddObjectCommand(editor, mesh));
  });
  options.add(option);

  // Lathe

  option = new UIRow();
  option.setClass('option');
  option.setTextContent(strings.getKey('menubar/add/lathe'));
  option.onClick(function () {
    let geometry = new THREE.LatheGeometry();
    let mesh = new THREE.Mesh(
      geometry,
      new THREE.MeshStandardMaterial({ side: THREE.DoubleSide })
    );
    mesh.name = 'Lathe';

    editor.execute(new AddObjectCommand(editor, mesh));
  });
  options.add(option);

  // Octahedron

  option = new UIRow();
  option.setClass('option');
  option.setTextContent(strings.getKey('menubar/add/octahedron'));
  option.onClick(function () {
    let geometry = new THREE.OctahedronGeometry(1, 0);
    let mesh = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial());
    mesh.name = 'Octahedron';

    editor.execute(new AddObjectCommand(editor, mesh));
  });
  options.add(option);

  // Plane

  option = new UIRow();
  option.setClass('option');
  option.setTextContent(strings.getKey('menubar/add/plane'));
  option.onClick(function () {
    let geometry = new THREE.PlaneGeometry(1, 1, 1, 1);
    let material = new THREE.MeshStandardMaterial();
    let mesh = new THREE.Mesh(geometry, material);
    mesh.name = 'Plane';

    editor.execute(new AddObjectCommand(editor, mesh));
  });
  options.add(option);

  // Ring

  option = new UIRow();
  option.setClass('option');
  option.setTextContent(strings.getKey('menubar/add/ring'));
  option.onClick(function () {
    let geometry = new THREE.RingGeometry(0.5, 1, 8, 1, 0, Math.PI * 2);
    let mesh = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial());
    mesh.name = 'Ring';

    editor.execute(new AddObjectCommand(editor, mesh));
  });
  options.add(option);

  // Sprite

  option = new UIRow();
  option.setClass('option');
  option.setTextContent(strings.getKey('menubar/add/sprite'));
  option.onClick(function () {
    let sprite = new THREE.Sprite(new THREE.SpriteMaterial());
    sprite.name = 'Sprite';

    editor.execute(new AddObjectCommand(editor, sprite));
  });
  options.add(option);

  // Tetrahedron

  option = new UIRow();
  option.setClass('option');
  option.setTextContent(strings.getKey('menubar/add/tetrahedron'));
  option.onClick(function () {
    let geometry = new THREE.TetrahedronGeometry(1, 0);
    let mesh = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial());
    mesh.name = 'Tetrahedron';

    editor.execute(new AddObjectCommand(editor, mesh));
  });
  options.add(option);

  // Torus

  option = new UIRow();
  option.setClass('option');
  option.setTextContent(strings.getKey('menubar/add/torus'));
  option.onClick(function () {
    let geometry = new THREE.TorusGeometry(1, 0.4, 8, 6, Math.PI * 2);
    let mesh = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial());
    mesh.name = 'Torus';

    editor.execute(new AddObjectCommand(editor, mesh));
  });
  options.add(option);

  // TorusKnot

  option = new UIRow();
  option.setClass('option');
  option.setTextContent(strings.getKey('menubar/add/torusknot'));
  option.onClick(function () {
    let geometry = new THREE.TorusKnotGeometry(1, 0.4, 64, 8, 2, 3);
    let mesh = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial());
    mesh.name = 'TorusKnot';

    editor.execute(new AddObjectCommand(editor, mesh));
  });
  options.add(option);

  // Tube

  option = new UIRow();
  option.setClass('option');
  option.setTextContent(strings.getKey('menubar/add/tube'));
  option.onClick(function () {
    let path = new THREE.CatmullRomCurve3([
      new THREE.Vector3(2, 2, -2),
      new THREE.Vector3(2, -2, -0.6666666666666667),
      new THREE.Vector3(-2, -2, 0.6666666666666667),
      new THREE.Vector3(-2, 2, 2),
    ]);

    let geometry = new THREE.TubeGeometry(path, 64, 1, 8, false);
    let mesh = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial());
    mesh.name = 'Tube';

    editor.execute(new AddObjectCommand(editor, mesh));
  });
  options.add(option);

  /*
	// Teapot

	option = new UIRow();
	option.setClass( 'option' );
	option.setTextContent( 'Teapot' );
	option.onClick( function () {

		let size = 50;
		let segments = 10;
		let bottom = true;
		let lid = true;
		let body = true;
		let fitLid = false;
		let blinnScale = true;

		let material = new THREE.MeshStandardMaterial();

		let geometry = new TeapotGeometry( size, segments, bottom, lid, body, fitLid, blinnScale );
		let mesh = new THREE.Mesh( geometry, material );
		mesh.name = 'Teapot';

		editor.addObject( mesh );
		editor.select( mesh );

	} );
	options.add( option );
	*/

  //

  options.add(new UIHorizontalRule());

  // AmbientLight

  option = new UIRow();
  option.setClass('option');
  option.setTextContent(strings.getKey('menubar/add/ambientlight'));
  option.onClick(function () {
    let color = 0x222222;

    let light = new THREE.AmbientLight(color);
    light.name = 'AmbientLight';

    editor.execute(new AddObjectCommand(editor, light));
  });
  options.add(option);

  // DirectionalLight

  option = new UIRow();
  option.setClass('option');
  option.setTextContent(strings.getKey('menubar/add/directionallight'));
  option.onClick(function () {
    let color = 0xffffff;
    let intensity = 1;

    let light = new THREE.DirectionalLight(color, intensity);
    light.name = 'DirectionalLight';
    light.target.name = 'DirectionalLight Target';

    light.position.set(5, 10, 7.5);

    editor.execute(new AddObjectCommand(editor, light));
  });
  options.add(option);

  // HemisphereLight

  option = new UIRow();
  option.setClass('option');
  option.setTextContent(strings.getKey('menubar/add/hemispherelight'));
  option.onClick(function () {
    let skyColor = 0x00aaff;
    let groundColor = 0xffaa00;
    let intensity = 1;

    let light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
    light.name = 'HemisphereLight';

    light.position.set(0, 10, 0);

    editor.execute(new AddObjectCommand(editor, light));
  });
  options.add(option);

  // PointLight

  option = new UIRow();
  option.setClass('option');
  option.setTextContent(strings.getKey('menubar/add/pointlight'));
  option.onClick(function () {
    let color = 0xffffff;
    let intensity = 1;
    let distance = 0;

    let light = new THREE.PointLight(color, intensity, distance);
    light.name = 'PointLight';

    editor.execute(new AddObjectCommand(editor, light));
  });
  options.add(option);

  // SpotLight

  option = new UIRow();
  option.setClass('option');
  option.setTextContent(strings.getKey('menubar/add/spotlight'));
  option.onClick(function () {
    let color = 0xffffff;
    let intensity = 1;
    let distance = 0;
    let angle = Math.PI * 0.1;
    let penumbra = 0;

    let light = new THREE.SpotLight(
      color,
      intensity,
      distance,
      angle,
      penumbra
    );
    light.name = 'SpotLight';
    light.target.name = 'SpotLight Target';

    light.position.set(5, 10, 7.5);

    editor.execute(new AddObjectCommand(editor, light));
  });
  options.add(option);

  //

  options.add(new UIHorizontalRule());

  // OrthographicCamera

  option = new UIRow();
  option.setClass('option');
  option.setTextContent(strings.getKey('menubar/add/orthographiccamera'));
  option.onClick(function () {
    let aspect = editor.camera.aspect;
    let camera = new THREE.OrthographicCamera(-aspect, aspect);
    camera.name = 'OrthographicCamera';

    editor.execute(new AddObjectCommand(editor, camera));
  });
  options.add(option);

  // PerspectiveCamera

  option = new UIRow();
  option.setClass('option');
  option.setTextContent(strings.getKey('menubar/add/perspectivecamera'));
  option.onClick(function () {
    let camera = new THREE.PerspectiveCamera();
    camera.name = 'PerspectiveCamera';

    editor.execute(new AddObjectCommand(editor, camera));
  });
  options.add(option);

  return container;
}

export { MenubarAdd };
