function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    var allText = "";
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                allText = rawFile.responseText;
            }
        }
    }
    rawFile.send(null);

    return allText;
}

class ProjectInfo
{
    constructor(FilePath)
    {
        var ProjectDataText = readTextFile(FilePath + "/ProjectInf.txt");
        var ProjectData = ProjectDataText.split('\n');
        this.Validated = false;
        if(ProjectDataText)
        {
            this.Validated = true;
            this.ProjectName = ProjectData[0];
            this.ProjectDescription = ProjectData[1];
            this.ProjectLink = ProjectData[2];
            this.AltProjectLink = ProjectData[3];
            this.ProjectType = ProjectData[4];
        }
    }
}