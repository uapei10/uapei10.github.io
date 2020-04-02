var tabButtons=document.querySelectorAll(".tabContainer .buttonContainer button");
var tabPanels=document.querySelectorAll(".tabContainer  .tabPanel");

function showPanel(panelIndex, colorCodeButton, colorCode) {
    tabButtons.forEach(function(node){
        node.style.backgroundColor="black";
        node.style.color="white";
    });
    tabButtons[panelIndex].style.backgroundColor=colorCodeButton;
    tabButtons[panelIndex].style.color="white";
    tabPanels.forEach(function(node){
        node.style.display="none";
    });
    tabPanels[panelIndex].style.display="block";
    tabPanels[panelIndex].style.backgroundColor=colorCode;
}
showPanel(0,'#676767', '#eee');