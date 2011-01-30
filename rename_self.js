// ==SakuraEditorScript==
// @name         rename_self.js
// @description  �J���Ă���t�@�C���̖��O��ύX����
// @author       s_hiiragi (https://twitter.com/s_hiiragi)
// @version      1.0
// @lastupdate   2011-01-30T01:56:20-09:00
// ==/SakuraEditorScript==

/**
 * Done: 
 *   �E�t�@�C������ύX�ł���
 * ToDo: 
 *   �E���ۑ����A�t�@�C���ۑ��_�C�A���O���J���ĕۑ�������
 * Future: 
 *   �E
 */

/**
 * �v�����v�g��\��
 * usage
 * var res = prompt(string message[, string default]);
 * @param  message  �\�����镶����
 * @param  default  �ŏ��ɓ��͂���Ă��镶����
 * @return  string  ���͂��ꂽ������
 *                  �~�{�^���ŕ�����L�����Z�����ꂽ�ꍇ��null
 */
(function(){
	var sc = new ActiveXObject('ScriptControl');
	sc.Language = 'VBScript';
	var func = [
		'Function InBox(message, title, default)', 
		'InBox = InputBox(message, title, default)', 
		'End Function'
	].join('\n');
	sc.AddCode(func);
	
	prompt = function(msg, def){
		var res = sc.Run('InBox', String(msg), '�T�N���G�f�B�^ JScript�}�N��', def || '');
		return (res !== void(0) ? res : null);
	};
})();

var console = {
	log : function(m){
//		Editor.TraceOut(m);
	}
};

(function(){
	// �����̃p�X���擾
	var docpath = Editor.GetFilename();
	console.log( '�����̃p�X' + docpath );

	// �܂�1�x���ۑ����Ă��Ȃ��ꍇ�͕ۑ�
	if( !docpath ){
		// FileSave()�ł�(����)�͕ۑ��o���Ȃ��炵��
		// �G�f�B�^�ŏ㏑���ۑ��{�^�����������Ƃ��̂悤�ȁA�t�@�C���������ĕۑ���
		// ���������Ă����Ƃ��ꂵ���̂Ɂc
//		Editor.FileSave();
		
		// �t�@�C���ۑ��_�C�A���O���J���A�t�@�C�������擾���ĕۑ�
		// Editor.FileSaveAs(docpath, 99, 0);
		return;
	}

	// �V�������O�����
	var newname = prompt('�V�����t�@�C����', docpath.replace(/^.*[\\\/]/, ''));
	if( !newname ){
		return;  // �L�����Z��
	}

	// ������ۑ����A����
	Editor.FileSave();
	Editor.FileClose();

	// ��������ύX
	var fso = new ActiveXObject('Scripting.FileSystemObject');
	var doc = fso.GetFile(docpath);
	console.log( doc.Name );

	doc.Name = newname;

	// �ύX��̃p�X���擾
	var mod_docpath = doc.Path;
	console.log( '�ύX��̃p�X\n"' + mod_docpath + '"' );

	// �ēx�������J��
	Editor.FileOpen(mod_docpath);
})();
