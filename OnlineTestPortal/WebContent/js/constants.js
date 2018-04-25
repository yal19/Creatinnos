var constants = {};

constants.remoteUrl1="http://ec2-52-66-177-248.ap-south-1.compute.amazonaws.com:8080";
constants.remoteUrl2="http://ec2-13-127-67-247.ap-south-1.compute.amazonaws.com:8080";
constants.projectName="onlinetestsystem";

constants.doLogin = constants.remoteUrl2 + "/" +constants.projectName + "/rest/login";
constants.doRegister = constants.remoteUrl2 + "/" +constants.projectName + "/rest/register";

constants.instructions = [
		"Total number of questions : 20.",
		"Time alloted : 30 minutes.",
		"Each question carry 1 mark, no negative marks.",
		"DO NOT refresh the page.",
		"All the best."
]