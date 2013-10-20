/**
 * @name         spin_seltext.js
 * @description  �I���e�L�X�g����/�O��
 * @author       s_hiiragi (https://github.com/s-hiiragi)
 */

/* �T�v
 * 
 * �I���e�L�X�g����or�O�̃e�L�X�g�֕ύX����B
 * 
 * ��1) ���֐i�ޗ�
 *   ������, �΁���, �c, ������ �Ƃ������悤�ɕύX�����
 *   1��2, 2��3, �c, 9��10 �Ƃ������悤�ɕύX�����
 * 
 * ��2) �O�֐i�ޗ�
 *   �����y, �y����, �c, ������ �Ƃ������悤�ɕύX�����
 *   10��9, 9��8, �c, 0��-1 �Ƃ������悤�ɕύX�����
 */

/* �ݒ�
 *   (1) ���ʐݒ聄�}�N�����J���A�ȉ���2��o�^����B
 *     ���O: "�I���e�L�X�g������", File:"next_seltext.js"
 *     ���O: "�I���e�L�X�g��O��", File:"prev_seltext.js"
 *   
 *   (2) ���ʐݒ聄�L�[���蓖�Ă��J���A�ȉ���2�̃L�[���蓖�Ă�ύX����B
 *     Ctrl+Up    => �I���e�L�X�g������
 *     Ctrl+Down  => �I���e�L�X�g��O��
 * 
 * �g����
 *   (1) �u���v�Ɠ��͂���B
 *   (2) �u���v��I�����ACtrl+Up �������� Ctrl+Down �������B
 */

var lists = [
		{ pattern: /^[���ΐ��؋��y��]$/, list: ['��','��','��','��','��','�y','��'] }, 
		{ pattern: /^[���ΐ��؋��y��]�j$/, list: ['���j','�Ηj','���j','�ؗj','���j','�y�j','���j'] }, 
		{ pattern: /^[���ΐ��؋��y��]�j��$/, list: ['���j��','�Ηj��','���j��','�ؗj��','���j��','�y�j��','���j��'] }, 
		{ pattern: /^(?:true|false)$/  , list: ['true', 'false'] }, 
		{ pattern: /^(?:True|False)$/  , list: ['True', 'False'] }
	];

(function() {
	if (!typeof macro_args) {
		Editor.TraceOut('Error: macro_args is undefind');
		return;
	}
	var delta = macro_args.delta;  // ��/�O�ɐi�ޗ�
	var seltext = Editor.GetSelectedString();
	
	// �I���e�L�X�g�̎�/�O�̃e�L�X�g���擾
	var replacement = null;
	var matches = /^[+\-]?[0-9]\d*$/.exec(seltext);
	if (matches) {
		replacement = String(Number(seltext) + delta);
		if (seltext.charAt(0) === '+' && replacement.charAt(0) !== '-') replacement = '+' + replacement;
	} else {
		var is_matches = lists.some(
			function(e) {
				if (!e.pattern.test(seltext))
					return false;
				
				var l = e.list.length;
				var i = e.list.indexOf(seltext);
				if (i == -1) throw new Error(seltext + ' is not found in lists.list');
				i += delta;
				while (i < 0) i += l;
				i %= l;
				
				replacement = e.list[i];
				return true;
			});
		if (!is_matches) return;
	}
	
	// �I���e�L�X�g����/�O�̃e�L�X�g�ɕύX
	// �A�����Ď��s�ł���悤�ɁA�e�L�X�g�I����Ԃ��ێ�����
	Editor.Delete();
	Editor.InsText(replacement);
	for (var i=0; i < replacement.length; i++) Editor.Left_Sel();
})();
