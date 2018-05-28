var constants = {};

constants.remoteUrl1="http://ec2-52-66-177-248.ap-south-1.compute.amazonaws.com:8080";
constants.remoteUrl2="http://ec2-13-127-67-247.ap-south-1.compute.amazonaws.com:8080";
constants.projectName="onlinetestsystem";

constants.doLogin = constants.remoteUrl2 + "/" +constants.projectName + "/rest/login";
constants.doRegister = constants.remoteUrl2 + "/" +constants.projectName + "/rest/register";

constants.instructions = [
		"Total number of questions : 20.",
		"Time allotted : 30 minutes.",
		"Each question carry 1 mark, no negative marks.",
		"DO NOT refresh the page.",
		"All the best."
];

constants.ExamInfo =[
    {"ExamId":"EXAM0001","Category":"CT01","SubCategory":"SCT01","Subject":"SUB01","ExamName":"Mid Term Revision","ExamStartDate":"2018-05-21","ExamEndDate":"2018-05-25","ExamDurationHours":"2","ExamDurationMin":"30","ExamTime":"10:30 AM","PassMark":"40","NegativeMark":"on","Candidates":"CAN01","CandidatesType":"available","Instruction":["Total number of questions : 20.","Time allotted : 30 minutes."],"progress":"N"}
];

constants.events = [
    {Event : "RRB Practice Exam has been postponded. Exam schedule will be revealed shortly.", PostedBy: "Sam Andrew", PostedOn : "28/04/2018"},
    {Event : "80% pass percentage in TANCET Practice Exam", PostedBy: "John Smith", PostedOn : "08/04/2018"}
];

constants.questCate = ["Analytical", "Logical", "Reasoning"];

constants.category = [
  {cateId : "CT01", categoryName : "SSLC"},
  {cateId : "CT02", categoryName : "HSC"},
  {cateId : "CT03", categoryName : "BE"},
  {cateId : "CT04", categoryName : "B.Sc"},
  {cateId : "CT05", categoryName : "Java Developer"},
  {cateId : "CT06", categoryName : "UI Developer"}
];

constants.subCategory = [
  {subCateId : "SCT01", Category: "CT01", subCategoryName : "MidTerm"},
  {subCateId : "SCT02", Category: "CT01", subCategoryName : "Pre-Quarterly"},
  {subCateId : "SCT03", Category: "CT02", subCategoryName : "Pre-Half Yearly"},
  {subCateId : "SCT04", Category: "CT03", subCategoryName : "CSE"},
  {subCateId : "SCT05", Category: "CT04", subCategoryName : "Chemistry"},
  {subCateId : "SCT06", Category: "CT05", subCategoryName : "Core Java"},
  {subCateId : "SCT06", Category: "CT05", subCategoryName : "Advanced Java"},
  {subCateId : "SCT07", Category: "CT06", subCategoryName : "Web Technologies"},
];

constants.subject = [
   { subId : "SUB01", SubCategory : "SCT01", SubjectName : "Physcis" },
   { subId : "SUB02", SubCategory : "SCT01", SubjectName : "Chemistry" },
   { subId : "SUB03", SubCategory : "SCT02", SubjectName : "Biology" },
   { subId : "SUB04", SubCategory : "SCT02", SubjectName : "History" },
   { subId : "SUB05", SubCategory : "SCT03", SubjectName : "English" },
   { subId : "SUB06", SubCategory : "SCT04", SubjectName : "Operating System" },
   { subId : "SUB07", SubCategory : "SCT05", SubjectName : "Inorganic Chemistry" },
];

constants.candidates = [
      { candidateID : "CAN01",Category: "CT01", Candidate: "SSC:B"},
      { candidateID : "CAN02",Category: "CT02", Candidate: "HSC:A"},
      { candidateID : "CAN03",Category: "CT03", Candidate: "Engg:CSE:1"},
      { candidateID : "CAN04",Category: "CT03", Candidate: "Engg:ECE:3"},
      { candidateID : "CAN01",Category: "CT04", Candidate: "BSc:Maths:2"},
      { candidateID : "CAN01",Category: "CT04", Candidate: "BSc:Physics:1"},
];

constants.question = [
	{ ExamId :"EXAM0001", questCategory:"Analytical",  questType: "multiple", question : "Which are all true in following statements", options: ["Option 1", "Option 2", "Option 3", "Option 4"]},
	{ ExamId :"EXAM0001", questCategory:"Analytical",  questType: "multiple", question : "Which are all false in following statements", options: ["Option 1", "Option 2", "Option 3", "Option 4"]},
	{ ExamId :"EXAM0001", questCategory:"Analytical",  questType: "multiple", question : "Which are all true in following statements", options: ["Option 1", "Option 2", "Option 3", "Option 4"]},
	{ ExamId :"EXAM0001", questCategory:"Logical",  questType: "single", question : "What is the syntax for Substr", options: ["Option 1", "Option 2", "Option 3", "Option 4"]},
	{ ExamId :"EXAM0001", questCategory:"Logical",  questType: "single", question :"What is the Type of Null", options: ["Option 1", "Option 2", "Option 3", "Option 4"]},
	{ ExamId :"EXAM0001", questCategory:"Reasoning",  questType: "boolean", question : "Is Undefined is equal to Null", options: []},
	{ ExamId :"EXAM0001", questCategory:"Reasoning",  questType: "desc", question : "Explain Closures.", options: []}
	
];