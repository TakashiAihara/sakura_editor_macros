/**
 * @file  �t�H���_���w�肵��TortoiseGit�̃��O��ʂ��J��
 */
(function(){
	var docPath = Editor.GetFilename();
	if (!docPath) return;

	var fso = new ActiveXObject('Scripting.FileSystemObject');
	var docFolderPath = fso.GetParentFolderName(docPath);
	
	var tortoiseGitProcPath = "C:\\Program Files\\TortoiseGit\\bin\\TortoiseGitProc.exe";
	if (!fso.FileExists(tortoiseGitProcPath)) {
		Editor.ErrorMsg(tortoiseGitProcPath + '��������܂���');
		return;
	}
	
	var command = '"' + tortoiseGitProcPath + '"'
		+ ' /command:log'
		+ ' /path:"' + docFolderPath + '"';

//	Editor.TraceOut('command=' + command);

	var sh = new ActiveXObject('WScript.Shell');
	sh.Run(command);
})();
