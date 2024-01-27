
// this extension currently has bugs, this comment must be removed if you fix this :D
(function(Scratch) {
  const blocks = [];
  const vars = {};
  const menus = {};
  var list = {
    '1': 'god is great, i seek refuge with allah from the accursed shaytan, in the name of allah, the most merciful, all praise is due to allah, lord of the worlds, the most merciful, sovereign of the day of recompense, it is you we worship and you we ask for help, guide us to the right path, the path of those upon whom you have bestowed favor, not those who have evoked your anger or of those who are astray'
    '2': 'alif lam meem, this is the book about which there is no doubt and a guidance for those conscios of allah, who believe in the unseen establish prayer and spend out of what we have provided for them, and who believe in what has been revealed to you and what was revealed before you and of the hereafter they are certain'
    '3': 'alif lam meen, allah - there is no deity except him the ever-living the sustainer of existence, he has sent down upon you the book in truth confirming what was before it and he revealed the torah and the gospel'
    '4': 'O mankind, fear your lord, who made you from 1 soul and made from it its mate and dispersed from both of them many men and women and fear allah through whom you ask 1 another and the wombs indeed allah is ever over you a observer, and give to the orphans their properties and dont substitute the defective for the good of theirs and dont consume their properties into your own indeed that is a sin'
    '5': 'O you who have believed, fulfill contracts lawful for you are the animals of grazing livestock except for that which is recited to you - hunting not being permitted while you are in the state of ihram indeed allah ordains what he intends'
}
  class Extension {
    getInfo() {
      return {
        "id": "quran",
        "name": "quran",
        "color1": "#3612846",
        "blocks": blocks,
        "menus": menus,
      }
    }
  }
  
blocks.push({
  opcode: "find-sureh",
  blockType: Scratch.BlockType.REPORTER,
  text: "find sureh [input] to from the quran",
  arguments: {
      "input": {
      type: Scratch.ArgumentType.NUMBER
    },

  },
  disableMonitor: false
});
Extension.prototype["find-sureh"] = function(args, util) {
  const localVars = {};
    var t = JSON.parse('{list);
    return t[["input"]];
};



  Scratch.extensions.register(new Extension());
})(Scratch);
