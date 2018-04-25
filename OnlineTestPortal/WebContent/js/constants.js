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
];

constants.ExamInfo = [
	{ExamName: "Mid Test 1", ExamStartDate: "20-04-2018", ExamEndDate: "21-04-2018", ExamTime: "9:00"},
	{ExamName: "Mid Test 2", ExamStartDate: "24-04-2018", ExamEndDate: "25-04-2018", ExamTime: "11:00"},
	{ExamName: "Mid Test 3", ExamStartDate: "25-04-2018", ExamEndDate: "27-04-2018", ExamTime: "10:00"}
]