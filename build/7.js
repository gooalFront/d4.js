webpackJsonp([7],{694:function(e,a,i){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var _=i(726),n=i.n(_);for(var c in _)"default"!==c&&function(e){i.d(a,e,function(){return _[e]})}(c);var m=i(762),r=i(543),o=r(n.a,m.a,!1,null,null,null);a.default=o.exports},726:function(e,a,i){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default={name:"risingSunChart",computed:{options:function(){return{mode:"javascript",tabSize:2,lineNumbers:!0,lineWrapping:!0,viewportMargin:1/0,showCursorWhenSelecting:!0,readOnly:!0,theme:"neo",extraKeys:{"Ctrl-Space":"autocomplete"}}}},data:function(){var e=this;return{code:" ",chart:null,config:{chart:{title:"旭日图",dblclick:function(e){var a=prompt("请输入需要修改的标题","");a&&(this.setChartTitle(a),this.updateTitle())},mouseover:function(e,a){a.attr("fill","blue").append("title").text("双击修改标题")},mouseout:function(e,a){a.attr("fill","#333"),a.select("title").remove()},el:"#chart-risingSun",type:"risingSun",data:[],colors:["#FF8B8B","#167C80","#005397","#FACA0C","#F3C9DD","#0BBCD6","#BFB5D7","#BEA1A5","#0E38B1","#A6CFE2","#371722","#C7C6C4","#DABAAE","#DB9AAD","#F1C3B8","#EF3E4A","#C0C2CE","#EEC0DB","#B6CAC0","#C5BEAA","#FDF06F","#EDB5BD","#17C37B","#2C3979","#1B1D1C","#E88565","#FFEFE5","#F4C7EE","#77EEDF","#E57066","#FBFE56","#A7BBC3","#3C485E","#055A5B","#178E96","#D3E8E1","#CBA0AA","#9C9CDD","#20AD65","#E75153","#4F3A4B","#112378","#A82B35","#FEDCCC","#00B28B","#9357A9","#C6D7C7","#B1FDEB","#BEF6E9","#776EA7","#EAEAEA","#EF303B","#1812D6","#FFFDE7","#D1E9E3","#7DE0E6","#3A745F","#CE7182","#340B0B","#F8EBEE","#FF9966","#002CFC","#75FFC0","#FB9B2A","#FF8FA4","#000000","#083EA7","#674B7C","#19AAD1","#12162D","#121738","#0C485E","#FC3C2D","#864BFF","#EF5B09","#97B8A3","#FFD101","#C26B6A","#E3E3E3","#FF4C06","#CDFF06","#0C485E","#1F3B34","#384D9D","#E10000","#F64A00","#89937A","#C39D63","#00FDFF","#B18AE0","#96D0FF","#3C225F","#FF6B61","#EEB200","#F9F7E8","#EED974","#F0CF61","#B7E3E4"],showText:!0,onselect:function(e){console.log(e)}},legend:{show:!0,data:[],position:"right",dblclick:function(a,i){e.d=a,e.i=i,e.$refs.inputColor.click()},mouseover:function(e,a){a.append("title").text("双击修改颜色")},mouseout:function(e,a){a.select("title").remove()}},tooltip:function(e){return"<span>基因："+e.name+"</span><br><span>长度："+e.value+"</span>"}}}},mounted:function(){var e={name:"k__Bacteria",children:[{name:"p__Proteobacteria",children:[{name:"c__Betaproteobacteria",children:[{name:"o__MND1",size:17},{name:"o__Burkholderiales",children:[{name:"f__Oxalobacteraceae",children:[{name:"g__Janthinobacterium",size:1},{name:"g__Cupriavidus",size:1}]},{name:"f__Burkholderiaceae",children:[{name:"g__Burkholderia",children:[{name:"s__bryophila",size:2}]},{name:"g__Pandoraea",size:1}]},{name:"f__Comamonadaceae",children:[{name:"g__Methylibium",size:4},{name:"g__Delftia",size:13},{name:"g__Hylemonella",size:4},{name:"g__Azohydromonas",size:1}]},{name:"f__Alcaligenaceae",children:[{name:"g__Achromobacter",size:1}]}]},{name:"o__A21b",children:[{name:"f__EB1003",size:13},{name:"f__UD5",size:1}]},{name:"o__Methylophilales",size:6},{name:"o__Procabacteriales",children:[{name:"f__Procabacteriaceae",children:[{name:"g__Procabacter",size:1}]}]},{name:"o__IS-44",size:8},{name:"o__SC-I-84",size:26},{name:"o__Ellin6067",size:20},{name:"o__Rhodocyclales",children:[{name:"f__Rhodocyclaceae",children:[{name:"g__Sterolibacterium",size:1},{name:"g__Uliginosibacterium",size:2}]}]},{name:"o__Neisseriales",children:[{name:"f__Neisseriaceae",size:2}]},{name:"o__Nitrosomonadales",children:[{name:"f__Nitrosomonadaceae",size:1}]}]},{name:"c__Alphaproteobacteria",children:[{name:"o__Rhizobiales",children:[{name:"f__Hyphomicrobiaceae",children:[{name:"g__Rhodoplanes",size:105},{name:"g__Devosia",size:4},{name:"g__Hyphomicrobium",size:11},{name:"g__Pedomicrobium",size:13}]},{name:"f__Bradyrhizobiaceae",children:[{name:"g__Bradyrhizobium",size:9},{name:"g__Bosea",children:[{name:"s__genosp.",size:2}]}]},{name:"f__Rhizobiaceae",children:[{name:"g__Rhizobium",size:4},{name:"g__Agrobacterium",children:[{name:"s__vitis",size:1}]}]},{name:"f__Beijerinckiaceae",size:10},{name:"f__Methylobacteriaceae",children:[{name:"g__Methylobacterium",size:2}]},{name:"f__Methylocystaceae",children:[{name:"g__Methylopila",size:2}]},{name:"f__Phyllobacteriaceae",children:[{name:"g__Phyllobacterium",size:2},{name:"g__Mesorhizobium",size:1}]},{name:"f__Brucellaceae",children:[{name:"g__Ochrobactrum",size:4}]},{name:"f__Xanthobacteraceae",children:[{name:"g__Labrys",size:6}]}]},{name:"o__Sphingomonadales",children:[{name:"f__Sphingomonadaceae",children:[{name:"g__Sphingomonas",children:[{name:"s__wittichii",size:10},{name:"s__yabuuchiae",size:2}]},{name:"g__Kaistobacter",size:4},{name:"g__Novosphingobium",size:6},{name:"g__Blastomonas",size:2}]}]},{name:"o__Rhodospirillales",children:[{name:"f__Rhodospirillaceae",children:[{name:"g__Telmatospirillum",size:5}]},{name:"f__Acetobacteraceae",children:[{name:"g__Acidocella",size:7},{name:"g__Acidisoma",size:2}]}]},{name:"o__Caulobacterales",children:[{name:"f__Caulobacteraceae",children:[{name:"g__Asticcacaulis",children:[{name:"s__biprosthecium",size:2}]},{name:"g__Phenylobacterium",size:9},{name:"g__Brevundimonas",children:[{name:"s__diminuta",size:2}]}]}]},{name:"o__Rickettsiales",children:[{name:"f__mitochondria",children:[{name:"g__Acanthamoeba",size:2},{name:"g__Saprolegnia",children:[{name:"s__ferax",size:1}]}]},{name:"f__Rickettsiaceae",children:[{name:"g__Rickettsia",size:2}]}]},{name:"o__Ellin329",size:31},{name:"o__BD7-3",size:3},{name:"o__Rhodobacterales",children:[{name:"f__Hyphomonadaceae",size:2},{name:"f__Rhodobacteraceae",children:[{name:"g__Rhodobacter",size:2}]}]}]},{name:"c__Deltaproteobacteria",children:[{name:"o__Desulfuromonadales",children:[{name:"f__Geobacteraceae",children:[{name:"g__Geobacter",size:18}]},{name:"f__Pelobacteraceae",size:1}]},{name:"o__Myxococcales",children:[{name:"f__Haliangiaceae",size:14},{name:"f__Myxococcaceae",children:[{name:"g__Anaeromyxobacter",size:3}]},{name:"f__Polyangiaceae",children:[{name:"g__Chondromyces",size:1}]},{name:"f__Cystobacterineae",size:3},{name:"f__0319-6G20",size:4}]},{name:"o__Syntrophobacterales",children:[{name:"f__Syntrophobacteraceae",children:[{name:"g__Syntrophobacter",size:1}]}]},{name:"o__MIZ46",size:34},{name:"o__Entotheonellales",children:[{name:"f__Entotheonellaceae",size:5}]},{name:"o__Spirobacillales",size:4},{name:"o__Bdellovibrionales",children:[{name:"f__Bdellovibrionaceae",children:[{name:"g__Bdellovibrio",children:[{name:"s__bacteriovorus",size:1}]}]},{name:"f__Bacteriovoracaceae",size:2}]},{name:"o__FAC87",size:2},{name:"o__NB1-j",children:[{name:"f__MND4",size:2},{name:"f__NB1-i",size:1}]},{name:"o__Desulfovibrionales",children:[{name:"f__Desulfovibrionaceae",children:[{name:"g__Desulfovibrio",children:[{name:"s__putealis",size:1}]}]}]}]},{name:"c__Gammaproteobacteria",children:[{name:"o__Xanthomonadales",children:[{name:"f__Sinobacteraceae",children:[{name:"g__Nevskia",size:1},{name:"g__Steroidobacter",size:3}]},{name:"f__Xanthomonadaceae",children:[{name:"g__Rhodanobacter",size:1},{name:"g__Luteibacter",children:[{name:"s__rhizovicinus",size:1}]},{name:"g__Dokdonella",size:3}]}]},{name:"o__Legionellales",children:[{name:"f__Legionellaceae",children:[{name:"g__Legionella",size:6}]},{name:"f__Coxiellaceae",children:[{name:"g__Aquicella",size:33},{name:"g__Rickettsiella",size:3}]}]},{name:"o__Enterobacteriales",children:[{name:"f__Enterobacteriaceae",size:36}]},{name:"o__Pseudomonadales",children:[{name:"f__Pseudomonadaceae",children:[{name:"g__Pseudomonas",children:[{name:"s__fragi",size:2},{name:"s__viridiflava",size:1}]}]},{name:"f__Moraxellaceae",children:[{name:"g__Acinetobacter",children:[{name:"s__rhizosphaerae",size:1}]},{name:"g__Perlucidibaca",size:2}]}]},{name:"o__Thiotrichales",children:[{name:"f__Piscirickettsiaceae",size:1}]}]}]},{name:"p__Acidobacteria",children:[{name:"c__Acidobacteriia",children:[{name:"o__Acidobacteriales",children:[{name:"f__Koribacteraceae",children:[{name:"g__Candidatus Koribacter",children:[{name:"s__versatilis",size:2}]}]},{name:"f__Acidobacteriaceae",children:[{name:"g__Edaphobacter",children:[{name:"s__modestum",size:5}]},{name:"g__Terriglobus",size:4}]}]}]},{name:"c__Sva0725",children:[{name:"o__Sva0725",size:13}]},{name:"c__Acidobacteria-6",children:[{name:"o__iii1-15",children:[{name:"f__RB40",size:16}]},{name:"o__CCU21",size:19}]},{name:"c__DA052",children:[{name:"o__Ellin6513",size:89}]},{name:"c__Solibacteres",children:[{name:"o__Solibacterales",children:[{name:"f__Solibacteraceae",children:[{name:"g__Candidatus Solibacter",size:62}]},{name:"f__AKIW659",size:2}]},{name:"o__JH-WHS99",size:3}]},{name:"c__Chloracidobacteria",children:[{name:"o__PK29",size:2},{name:"o__RB41",children:[{name:"f__Ellin6075",size:8}]},{name:"o__11-24",size:9},{name:"o__Ellin7246",size:2}]},{name:"c__iii1-8",children:[{name:"o__32-20",size:9},{name:"o__SJA-36",size:5},{name:"o__DS-18",size:13}]},{name:"c__TM1",size:14},{name:"c__Acidobacteria-5",size:12},{name:"c__EC1113",size:5},{name:"c__BPC102",children:[{name:"o__MVS-40",size:1}]},{name:"c__Holophagae",children:[{name:"o__Holophagales",children:[{name:"f__Holophagaceae",size:1}]}]},{name:"c__PAUC37f",size:1},{name:"c__RB25",size:1}]},{name:"p__Firmicutes",children:[{name:"c__Bacilli",children:[{name:"o__Bacillales",children:[{name:"f__Paenibacillaceae",children:[{name:"g__Paenibacillus",children:[{name:"s__chondroitinus",size:3}]},{name:"g__Cohnella",size:4},{name:"g__Ammoniphilus",size:2}]},{name:"f__Bacillaceae",children:[{name:"g__Bacillus",children:[{name:"s__flexus",size:1},{name:"s__thermoamylovorans",size:1}]}]},{name:"f__Planococcaceae",children:[{name:"g__Lysinibacillus",children:[{name:"s__boronitolerans",size:3}]},{name:"g__Solibacillus",size:3},{name:"g__Sporosarcina",size:2}]},{name:"f__Pasteuriaceae",children:[{name:"g__Pasteuria",size:1}]},{name:"f__Alicyclobacillaceae",children:[{name:"g__Alicyclobacillus",size:5}]},{name:"f__Thermoactinomycetaceae",children:[{name:"g__Planifilum",size:2},{name:"g__Shimazuella",size:3}]},{name:"f__Sporolactobacillaceae",size:1},{name:"f__Staphylococcaceae",children:[{name:"g__Staphylococcus",size:1}]}]},{name:"o__Lactobacillales",children:[{name:"f__Streptococcaceae",children:[{name:"g__Streptococcus",size:2}]},{name:"f__Enterococcaceae",children:[{name:"g__Enterococcus",size:1}]}]}]},{name:"c__Clostridia",children:[{name:"o__Clostridiales",children:[{name:"f__Clostridiaceae",children:[{name:"g__Clostridium",children:[{name:"s__bowmanii",size:1}]},{name:"g__Caloramator",size:1},{name:"g__SMB53",size:1},{name:"g__Oxobacter",size:1}]},{name:"f__Peptococcaceae",children:[{name:"g__Desulfosporosinus",children:[{name:"s__meridiei",size:3}]}]},{name:"f__Ruminococcaceae",size:6},{name:"f__Lachnospiraceae",children:[{name:"g__Coprococcus",size:1},{name:"g__Ruminococcus",size:1}]},{name:"f__Peptostreptococcaceae",size:2},{name:"f__Caldicoprobacteraceae",children:[{name:"g__Caldicoprobacter",size:1}]},{name:"f__Tissierellaceae",size:1}]},{name:"o__OPB54",size:4}]}]},{name:"p__Verrucomicrobia",children:[{name:"c__Spartobacteria",children:[{name:"o__Chthoniobacterales",children:[{name:"f__Chthoniobacteraceae",children:[{name:"g__DA101",size:79},{name:"g__Chthoniobacter",size:9},{name:"g__Candidatus Xiphinematobacter",size:12},{name:"g__Ellin506",size:5},{name:"g__heteroC45_4W",size:2}]}]}]},{name:"c__Opitutae",children:[{name:"o__Opitutales",children:[{name:"f__Opitutaceae",children:[{name:"g__Opitutus",size:15}]}]},{name:"o__Cerasicoccales",children:[{name:"f__Cerasicoccaceae",size:1}]}]},{name:"c__Pedosphaerae",children:[{name:"o__Pedosphaerales",children:[{name:"f__Ellin515",size:29},{name:"f__auto67_4W",size:18},{name:"f__Pedosphaeraceae",children:[{name:"g__Pedosphaera",size:4}]},{name:"f__Ellin517",size:2}]}]},{name:"c__Methylacidiphilae",children:[{name:"o__Methylacidiphilales",size:4},{name:"o__S-BQ2-57",size:6}]},{name:"c__Verrucomicrobiae",children:[{name:"o__Verrucomicrobiales",children:[{name:"f__Verrucomicrobiaceae",children:[{name:"g__Prosthecobacter",size:1},{name:"g__Luteolibacter",size:1}]}]}]}]},{name:"p__Planctomycetes",children:[{name:"c__Planctomycetia",children:[{name:"o__Gemmatales",children:[{name:"f__Gemmataceae",children:[{name:"g__Gemmata",size:28}]},{name:"f__Isosphaeraceae",children:[{name:"g__Nostocoida",size:2}]}]},{name:"o__Pirellulales",children:[{name:"f__Pirellulaceae",children:[{name:"g__A17",size:8},{name:"g__Pirellula",size:4}]}]},{name:"o__Planctomycetales",children:[{name:"f__Planctomycetaceae",children:[{name:"g__Planctomyces",size:17}]}]}]},{name:"c__Phycisphaerae",children:[{name:"o__WD2101",size:34},{name:"o__Pla1",size:2},{name:"o__mle1-8",size:1},{name:"o__Phycisphaerales",size:2},{name:"o__CPla-3",size:1}]},{name:"c__vadinHA49",children:[{name:"o__DH61",size:3},{name:"o__p04_C01",size:4}]},{name:"c__BD7-11",size:9},{name:"c__OM190",children:[{name:"o__agg27",size:3}]},{name:"c__Pla4",size:6},{name:"c__028H05-P-BN-P5",size:1}]},{name:"p__Bacteroidetes",children:[{name:"c__Saprospirae",children:[{name:"o__Saprospirales",children:[{name:"f__Chitinophagaceae",children:[{name:"g__Chitinophaga",size:2},{name:"g__Flavisolibacter",size:6},{name:"g__Sediminibacterium",size:7}]},{name:"f__Saprospiraceae",size:1}]}]},{name:"c__Sphingobacteriia",children:[{name:"o__Sphingobacteriales",children:[{name:"f__Sphingobacteriaceae",children:[{name:"g__Pedobacter",children:[{name:"s__cryoconitis",size:3}]},{name:"g__Solitalea",size:1}]}]}]},{name:"c__Cytophagia",children:[{name:"o__Cytophagales",children:[{name:"f__Cytophagaceae",children:[{name:"g__Cytophaga",size:1},{name:"g__Hymenobacter",size:1},{name:"g__Spirosoma",size:1},{name:"g__Sporocytophaga",size:1},{name:"g__Dyadobacter",size:1},{name:"g__Adhaeribacter",size:1}]},{name:"f__Amoebophilaceae",children:[{name:"g__Candidatus Amoebophilus",size:1}]}]}]},{name:"c__Flavobacteriia",children:[{name:"o__Flavobacteriales",children:[{name:"f__Flavobacteriaceae",children:[{name:"g__Flavobacterium",size:7}]},{name:"f__Weeksellaceae",children:[{name:"g__Chryseobacterium",size:2}]}]}]},{name:"c__Bacteroidia",children:[{name:"o__Bacteroidales",children:[{name:"f__S24-7",size:1}]}]}]},{name:"p__Elusimicrobia",children:[{name:"c__Elusimicrobia",children:[{name:"o__IIb",size:8},{name:"o__FAC88",size:20},{name:"o__Elusimicrobiales",size:13},{name:"o__MVP-88",size:1}]},{name:"c__Endomicrobia",size:1}]},{name:"p__Actinobacteria",children:[{name:"c__Actinobacteria",children:[{name:"o__Actinomycetales",children:[{name:"f__Actinosynnemataceae",children:[{name:"g__Lentzea",size:1},{name:"g__Kutzneria",size:1}]},{name:"f__Nocardioidaceae",children:[{name:"g__Nocardioides",size:1}]},{name:"f__Nakamurellaceae",size:2},{name:"f__Streptosporangiaceae",children:[{name:"g__Nonomuraea",size:1},{name:"g__Streptosporangium",size:1},{name:"g__Sphaerisporangium",size:1}]},{name:"f__Micromonosporaceae",children:[{name:"g__Pilimelia",size:3},{name:"g__Actinoplanes",size:4},{name:"g__Dactylosporangium",size:1}]},{name:"f__Cellulomonadaceae",children:[{name:"g__Demequina",size:1},{name:"g__Cellulomonas",children:[{name:"s__xylanilytica",size:1}]}]},{name:"f__Micrococcaceae",size:2},{name:"f__Thermomonosporaceae",children:[{name:"g__Actinoallomurus",children:[{name:"s__iriomotensis",size:2}]}]},{name:"f__Pseudonocardiaceae",children:[{name:"g__Pseudonocardia",size:8},{name:"g__Amycolatopsis",size:2}]},{name:"f__Nocardiaceae",children:[{name:"g__Nocardia",size:3},{name:"g__Rhodococcus",size:2}]},{name:"f__Streptomycetaceae",children:[{name:"g__Streptomyces",size:6}]},{name:"f__Microbacteriaceae",children:[{name:"g__Frigoribacterium",size:1},{name:"g__Salinibacterium",size:3}]},{name:"f__Frankiaceae",children:[{name:"g__Frankia",size:2}]},{name:"f__Actinospicaceae",size:3},{name:"f__Mycobacteriaceae",children:[{name:"g__Mycobacterium",children:[{name:"s__celatum",size:2}]}]},{name:"f__Kineosporiaceae",size:3},{name:"f__Sporichthyaceae",children:[{name:"g__Sporichthya",size:1}]},{name:"f__Actinomycetaceae",children:[{name:"g__Actinomyces",size:1}]},{name:"f__ACK-M1",size:1},{name:"f__Corynebacteriaceae",children:[{name:"g__Corynebacterium",size:1}]},{name:"f__Intrasporangiaceae",size:4},{name:"f__Geodermatophilaceae",size:1}]}]},{name:"c__Acidimicrobiia",children:[{name:"o__Acidimicrobiales",children:[{name:"f__EB1017",size:17},{name:"f__C111",size:3},{name:"f__Iamiaceae",children:[{name:"g__Iamia",size:1}]}]}]},{name:"c__Thermoleophilia",children:[{name:"o__Solirubrobacterales",children:[{name:"f__Conexibacteraceae",children:[{name:"g__Conexibacter",size:1}]},{name:"f__Solirubrobacteraceae",size:3},{name:"f__Patulibacteraceae",size:1}]},{name:"o__Gaiellales",children:[{name:"f__Gaiellaceae",size:37}]}]},{name:"c__MB-A2-108",children:[{name:"o__0319-7L14",size:1}]}]},{name:"p__TM6",children:[{name:"c__SJA-4",children:[{name:"o__S1198",size:4}]},{name:"c__SBRH58",size:6}]},{name:"p__Chloroflexi",children:[{name:"c__Ktedonobacteria",children:[{name:"o__Thermogemmatisporales",children:[{name:"f__Thermogemmatisporaceae",size:40}]},{name:"o__Ktedonobacterales",children:[{name:"f__Ktedonobacteraceae",children:[{name:"g__FFCH10602",size:2}]}]},{name:"o__B12-WMSP1",size:2},{name:"o__JG30-KF-AS9",size:4}]},{name:"c__Anaerolineae",children:[{name:"o__SBR1031",children:[{name:"f__oc28",size:1},{name:"f__SHA-31",size:1},{name:"f__A4b",size:1}]},{name:"o__H39",size:4},{name:"o__WCHB1-50",size:3},{name:"o__envOPS12",size:1},{name:"o__SHA-20",size:1},{name:"o__A31",children:[{name:"f__S47",size:1}]}]},{name:"c__P2-11E",size:4},{name:"c__Ellin6529",size:9},{name:"c__Thermomicrobia",children:[{name:"o__Ellin6537",size:2}]},{name:"c__S085",size:8},{name:"c__TK10",children:[{name:"o__B07_WMSP1",children:[{name:"f__FFCH4570",size:3}]},{name:"o__AKYG885",children:[{name:"f__5B-12",size:3}]}]},{name:"c__SHA-26",size:3},{name:"c__Gitt-GS-136",size:1},{name:"c__TK17",children:[{name:"o__mle1-48",size:1}]},{name:"c__C0119",size:1}]},{name:"p__OD1",children:[{name:"c__SM2F11",size:7},{name:"c__ZB2",size:2},{name:"c__Mb-NB09",size:1}]},{name:"p__Armatimonadetes",children:[{name:"c__Armatimonadia",children:[{name:"o__FW68",size:13},{name:"o__Armatimonadales",children:[{name:"f__Armatimonadaceae",size:3}]}]},{name:"c__0319-6E2",size:7},{name:"c__Fimbriimonadia",children:[{name:"o__Fimbriimonadales",children:[{name:"f__Fimbriimonadaceae",children:[{name:"g__Fimbriimonas",size:8}]}]}]},{name:"c__Chthonomonadetes",children:[{name:"o__Chthonomonadales",children:[{name:"f__Chthonomonadaceae",size:4}]},{name:"o__SJA-22",size:3}]}]},{name:"p__Spirochaetes",children:[{name:"c__Spirochaetes",children:[{name:"o__Spirochaetales",children:[{name:"f__Spirochaetaceae",children:[{name:"g__Spirochaeta",children:[{name:"s__aurantia",size:2}]}]}]}]},{name:"c__Leptospirae",children:[{name:"o__Leptospirales",children:[{name:"f__Leptospiraceae",children:[{name:"g__Turneriella",size:1}]}]}]}]},{name:"p__Cyanobacteria",children:[{name:"c__ML635J-21",size:6},{name:"c__Chloroplast",children:[{name:"o__Streptophyta",size:28},{name:"o__Stramenopiles",size:5},{name:"o__Chlorophyta",children:[{name:"f__Trebouxiophyceae",children:[{name:"g__Coccomyxa",size:2}]}]}]},{name:"c__4C0d-2",children:[{name:"o__MLE1-12",size:14},{name:"o__SM1D11",size:2}]},{name:"c__Oscillatoriophycideae",children:[{name:"o__Oscillatoriales",children:[{name:"f__Phormidiaceae",children:[{name:"g__Phormidium",size:1}]}]}]},{name:"c__Nostocophycideae",children:[{name:"o__Nostocales",children:[{name:"f__Nostocaceae",children:[{name:"g__Nostoc",size:1}]}]}]}]},{name:"p__Gemmatimonadetes",children:[{name:"c__Gemmatimonadetes",children:[{name:"o__KD8-87",size:4},{name:"o__Ellin5290",size:10},{name:"o__Gemmatimonadales",children:[{name:"f__Ellin5301",size:5}]},{name:"o__N1423WL",size:5}]},{name:"c__Gemm-1",size:25}]},{name:"p__AD3",children:[{name:"c__ABS-6",size:11},{name:"c__JG37-AG-4",size:6}]},{name:"p__WPS-2",size:32},{name:"p__Nitrospirae",children:[{name:"c__Nitrospira",children:[{name:"o__Nitrospirales",children:[{name:"f__Nitrospiraceae",children:[{name:"g__JG37-AG-70",size:2},{name:"g__Nitrospira",size:3}]},{name:"f__0319-6A21",size:18},{name:"f__Leptospirillaceae",size:3}]}]}]},{name:"p__SBR1093",size:2},{name:"p__Chlamydiae",children:[{name:"c__Chlamydiia",children:[{name:"o__Chlamydiales",children:[{name:"f__Parachlamydiaceae",children:[{name:"g__Candidatus Protochlamydia",size:4}]},{name:"f__Rhabdochlamydiaceae",children:[{name:"g__Candidatus Rhabdochlamydia",size:4}]}]}]}]},{name:"p__WS3",children:[{name:"c__PRR-12",children:[{name:"o__Sediment-1",children:[{name:"f__PRR-10",size:7}]}]}]},{name:"p__TM7",children:[{name:"c__SC3",size:4},{name:"c__MJK10",size:1}]},{name:"p__GAL15",size:3},{name:"p__Fibrobacteres",children:[{name:"c__Fibrobacteria",children:[{name:"o__258ds10",size:5}]}]},{name:"p__OP3",children:[{name:"c__PBS-25",size:4},{name:"c__koll11",children:[{name:"o__GIF10",children:[{name:"f__kpj58rc",size:4}]}]}]},{name:"p__Thermi",children:[{name:"c__Deinococci",children:[{name:"o__Thermales",children:[{name:"f__Thermaceae",children:[{name:"g__Thermus",size:1}]}]}]}]},{name:"p__Chlorobi",children:[{name:"c__SJA-28",size:3},{name:"c__BSV26",children:[{name:"o__A89",size:2}]}]},{name:"p__Tenericutes",children:[{name:"c__Mollicutes",children:[{name:"o__Anaeroplasmatales",children:[{name:"f__Anaeroplasmataceae",children:[{name:"g__Asteroleplasma",size:8}]}]}]}]},{name:"p__BHI80-139",size:3},{name:"p__OP11",children:[{name:"c__OP11-3",size:1},{name:"c__OP11-4",size:1}]},{name:"p__FCPU426",size:3},{name:"p__WS2",children:[{name:"c__SHA-109",size:1}]},{name:"p__FBP",size:1}]};this.config.chart.data=e,this.chart=this.d4.init(this.config)},methods:{redraw:function(){this.chart.redraw()},deepRedraw:function(){this.chart.redraw(!0)},colorChange:function(e){this.chart.setColor(e.target.value,this.i),this.chart.redraw()},single:function(){this.selectedModule="single",this.chart.setChartSelectModule(this.selectedModule)},multiple:function(){this.selectedModule="multiple",this.chart.setChartSelectModule(this.selectedModule)}}}},762:function(e,a,i){"use strict";var _=function(){var e=this,a=e.$createElement,i=e._self._c||a;return i("div",{attrs:{id:"risingSun-chart"}},[i("h3",[e._v("旭日图")]),e._v(" "),i("el-button",{attrs:{size:"small"},on:{click:e.redraw}},[e._v("Redraw")]),e._v(" "),i("el-button",{attrs:{size:"small"},on:{click:e.deepRedraw}},[e._v("deepRedraw")]),e._v(" "),i("input",{ref:"inputColor",attrs:{type:"color"},on:{change:e.colorChange}}),e._v(" "),i("div",{staticClass:"chart-content",attrs:{id:"chart-risingSun"}}),e._v(" "),i("codemirror",{ref:"code",attrs:{options:e.options},model:{value:e.code,callback:function(a){e.code=a},expression:"code"}})],1)},n=[],c={render:_,staticRenderFns:n};a.a=c}});
//# sourceMappingURL=7.js.map