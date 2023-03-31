// PROJECT TEMPLATE:
//
//<li>
//    <div class="Project">                                     // Project Cell Division.
//        <a href="https://www.youtube.com">                    // Link To Project Page On Website.
//            <img width="225" height="200" src="Cover.png">    // Thumbnail.
//            <h2 class="GameName">Game Name</h2>               // Name Of Game.
//            <label>Game Description</label>                   // Short Description.
//        </a>
//    </div>
//</li>

var ProjectList = document.getElementById("Projects List");

function CreateProjectList()
{
    var ProjectsDirectoryList = readTextFile("ProjectList.txt").split('\n');

    for (var P = 0; P < ProjectsDirectoryList.length; P++)
    {
        if(ProjectsDirectoryList[P] == "") { continue; }
        var ProjectPath = "Projects/" + ProjectsDirectoryList[P];
        var Project = new ProjectInfo(ProjectPath);
        var ListItem = document.createElement("li");

        var ProjectDiv = document.createElement("div");
        ProjectDiv.className = "Project";
        ListItem.appendChild(ProjectDiv);

        var ProjectLink = document.createElement("a");
        ProjectLink.href = "ProjectView.html?ProjectID=" + ProjectsDirectoryList[P];
        ProjectDiv.appendChild(ProjectLink)

        var ProjectThumbnail = document.createElement("img");
        ProjectThumbnail.width = 300;
        ProjectThumbnail.height = 225;
        ProjectThumbnail.src = ProjectPath + "/GameCover.png";
        ProjectLink.appendChild(ProjectThumbnail);

        var ProjectTitle = document.createElement("h2");
        ProjectTitle.className = "GameName";
        ProjectTitle.innerHTML = Project.ProjectName;
        ProjectLink.appendChild(ProjectTitle);

        var ProjectDesc = document.createElement("label");
        ProjectDesc.innerHTML = Project.ProjectDescription;
        ProjectLink.appendChild(ProjectDesc);

        ProjectList.appendChild(ListItem);
    }
}

CreateProjectList();