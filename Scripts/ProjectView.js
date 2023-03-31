const URLQuery = window.location.search;
const URLParams = new URLSearchParams(URLQuery);
var GameName = URLParams.get("ProjectID");
var ProjectPath = "Projects/" + GameName;
var Project = new ProjectInfo(ProjectPath);

var GameTitle = document.getElementById("Game Name");
var GameDescription = document.getElementById("Game Description");
var DownloadDiv = document.getElementById("Download");
var GameFrame = document.getElementById("Unity Container");
var About = document.getElementById("About Project");

function CreateDownloadButton()
{
    var DownloadLink = document.createElement("a");
    DownloadLink.href = "Files/" + Project.ProjectLink;
    var DownloadButton = document.createElement("button");
    DownloadButton.innerHTML = "Download " + Project.ProjectName;
    DownloadLink.appendChild(DownloadButton);
    DownloadDiv.appendChild(DownloadLink);
}

function ConstructProjectView()
{
    if(Project.Validated)
    {
        document.getElementById("Tab Title").innerHTML += " - " + Project.ProjectName;
        GameTitle.innerHTML = Project.ProjectName;
        GameDescription.innerHTML = Project.ProjectDescription;
        if(Project.ProjectType != "WebGame") { DownloadDiv.removeChild(GameFrame); }

        switch (Project.ProjectType)
        {
            case "ItchEmbed":
            {
                var ItchFrame = document.createElement("iframe");
                ItchFrame.width = 552;
                ItchFrame.height = 167;
                ItchFrame.setAttribute("frameborder", 10);
                ItchFrame.src = Project.ProjectLink;

                var ItchLink = document.createElement("a");
                ItchLink.href = Project.AltProjectLink;
                ItchLink.innerHTML = Project.ProjectName + " By GuyMakesStuff";
                ItchFrame.appendChild(ItchLink);

                DownloadDiv.appendChild(ItchFrame);
                break;
            }
            case "Downloadable":
            {
                CreateDownloadButton();
                break;
            }
            case "DownloadablePreview":
            {
                var ProjectImage = document.createElement("img");
                ProjectImage.src = ProjectPath + "/GameCover.png"
                ProjectImage.width = 450;
                ProjectImage.height = 300;
                DownloadDiv.appendChild(ProjectImage);

                DownloadDiv.append(document.createElement("br"));
                CreateDownloadButton();
                break;
            }
            case "WebGame":
            {
                GameFrame.setAttribute("name", Project.ProjectName);
                GameFrame.src = "Files/" + GameName + "/index.html";
            }
        }

        var AboutText = readTextFile(ProjectPath + "/ProjectDocs.html");
        if(!AboutText) { AboutText = "<label>No Documentation Available</label>" }
        About.innerHTML += AboutText;
    }
    else
    {
        GameTitle.innerHTML = "Invalid Project ID!";
        GameDescription.innerHTML = "Project With ID " + GameName + " Does Not Exist!</br><a href=Projects.html>Back To Projects Feed</a>";
        DownloadDiv.remove();
        About.remove();
    }
}

ConstructProjectView();