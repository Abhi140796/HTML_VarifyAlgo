$("document").ready(()=>{
    const editTextArea = $("#edithere");
    editTextArea.blur(()=>{
        let editTextAreaValue = editTextArea.val();
        console.log(editTextAreaValue);
        isHTMLStructureCorrect(editTextAreaValue);
        console.log('isHTMLTagValid: '+isHTMLStructureCorrect(editTextAreaValue));
        //getUnclosedHtmlTags(editTextAreaValue);
    });
});


// function to check html tag structure
function isHTMLStructureCorrect(textAreaValue){
    let closedTags = [];
    if(textAreaValue != '' || textAreaValue != undefined){
        //debugger;
        // Regex
        const reg = /(<)[\/\w]+(>)/gm;
        const matchString = /[\w]+/gm;
        const matchClosedTags = /(<\/)[\w]+(>)/gm;
        var htmlTagStructure = textAreaValue.match(reg);

        let len = htmlTagStructure.length;
        
        // Filling Closed Tag Array
        try{
            if(matchClosedTags.test(htmlTagStructure[0]))
                return false;
            for(let i = 0; i < len; i++){
                let isClosedTag = matchClosedTags.test(htmlTagStructure[i]);
                if(isClosedTag){
                    closedTags.push(htmlTagStructure[i]);
                    htmlTagStructure.splice(i,1);
                    i = 0;
                }
                if(!isClosedTag && closedTags.length != 0 && htmlTagStructure.length != 0){
                    function checkString(word)
                    {
                        let openTag = word.match(matchString);
                        let closeTag = closedTags[closedTags.length - 1].match(matchString);
                        return openTag = closeTag;
                    }
                    
                    let checkInAllTag = htmlTagStructure.find(checkString);
                    let getIndexOf = htmlTagStructure.indexOf(checkInAllTag);
                    if(checkInAllTag){
                        htmlTagStructure.splice(getIndexOf,1);
                        closedTags.pop();
                        i = 0;
                    }
                }
            }
            if(htmlTagStructure.length === 0 && closedTags.length === 0)
                return true;
            else
                return false;
        }
        catch(Exception){
            console.log(Exception);
            return false;
        }

    }
}