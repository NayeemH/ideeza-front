import { SetValueCommand } from '@organisms/threejs/js/commands/SetValueCommand';

export function selectLeg(editor, id) {
  if (!id) return;
  let legs = editor.scene.getObjectByName('Legs');

  if (!legs) return;

  let leg = legs.children.find((e) => String(e?.userData?.id) === String(id));

  if (leg) editor.select(leg);
}

export function setLegValues(editor, values) {
  values = values?.leg_meaning;

  if (values)
    editor.execute(
      new SetValueCommand(editor, editor.scene, 'userData', {
        ...editor.scene.userData,
        values,
      })
    );
}
