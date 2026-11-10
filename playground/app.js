import { criaElementu, mannaAlletta, pigghiaElementi, pigghiaElementu } from "js-siciliano";
import "js-siciliano/globale";

const a = pigghiaElementu("a").testu("ciasdasdasdao").indirizzuVersu("#ee");

console.log(
  criaElementu("article")
    .appinniChidduChiVoi(a)
    .appinniNtoCorpuDuDocumentu()
    .mettiAttribbutu("id", "ciao")
    .pigghiaAttributu("id"),
);
