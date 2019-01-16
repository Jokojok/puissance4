$(function () {
    for (let i = 0; i < size+1; i++) {
        $("#grille").append("<tr></tr>");
    }
    for (let i = 0; i < size; i++) {
        $("#grille > tr").each(function () { $(this).append("<td style='height:"+sizeOfACase+"px; width:"+sizeOfACase+"px; border-radius:50%'></td>") });
    }
    for(let i = 0; i < size; i++){
        $($("#grille > tr:last > td")[i]).html("<button onclick='jouer(" + i + ")' style='width:100%; height:100%'>" + (i+1) + "</button>");
        $($("#grille > tr:last > td")[i]).css('border-radius', '');
    }
});