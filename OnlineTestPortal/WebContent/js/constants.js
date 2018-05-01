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
{ExamName: "JEE Practice Exam", ExamStartDate: "2018-05-20", ExamEndDate: "2018-05-22", ExamDuration: "1 Hour", progress: "Y"},
	{ExamName: "TNPC Practice Exam", ExamStartDate: "2018-05-19", ExamEndDate: "2018-05-28", ExamDuration: "1 Hour", progress: "N"},
	{ExamName: "RRB Practice Exam", ExamStartDate: "2018-05-15", ExamEndDate: "2018-05-21", ExamDuration: "1 Hour", progress: "N"},
	{ExamName: "Group - 4 Practice", ExamStartDate: "2018-05-04", ExamEndDate: "2018-05-10", ExamDuration: "2 Hours 30 Minutes", progress: "Y"},
	{ExamName: "TANCET Entrance Practice", ExamStartDate: "2018-04-20", ExamEndDate: "2018-04-21", ExamDuration: "50 Minutes", progress: "E"}
];

constants.events = [
    {Event : "RRB Practice Exam has been postponded. Exam schedule will be revealed shortly.", PostedBy: "Sam Andrew", PostedOn : "28/04/2018"},
    {Event : "80% pass percentage in TANCET Practice Exam", PostedBy: "John Smith", PostedOn : "08/04/2018"}
];