const axios = require("axios");
const excel = require("excel4node");
const cheerio = require("cheerio");
const path = require("path");
require("dotenv").config();

const idDalben = [
  ["ACHOCOLATADO EM PO TODDY ORIGINAL LT 370G", "63316"],
  ["ACHOCOLATADO NESCAU ACT-GO 370G", "59670"],
  ["ACUCAR CRISTAL UNIAO 1kg", "4173"],
  ["AGUA MINERAL MINALBA S/G 1,5L", "0"],
  ["AGUA MINERAL MINALBA S/G 8x1,5L", "0"],
  ["AGUA SANITARIA YPE 2L", "2434"],
  ["AGUA TONICA ANTARCTICA DIET LATA 350ML", "9085"],
  ["AGUA TONICA ANTARCTICA LATA 350ML", "9084"],
  ["AZEITE EXTRA VIRGEM VD ANDORINHA 500ML", "1726"],
  ["BISNAGUINHA PANCO 300G", "697"],
  ["CAFE 3 CORACOES EXTRA FORTE 500G", "1621"],
  ["CAFE 3 CORACOES TRADICIONAL 500G", "1622"],
  ["CAFE MELITTA EXTRA FORTE 500G", "55958"],
  ["CAFE MELITTA TRADICIONAL 500G ", "11891"],
  ["CERVEJA AMSTEL 350ML", "8950"],
  ["CERVEJA AMSTEL ULTRA 269ML", "0"],
  ["CERVEJA AMSTEL ULTRA LN 275ml", "0"],
  ["CERVEJA BECKS LATA SLEEK 350ml", "49631"],
  ["CERVEJA HEINEKEN 600ML", "8104"],
  ["CERVEJA HEINEKEN LATA 0% 350ML", "51531"],
  ["CERVEJA HEINEKEN LATA 250ML", "0"],
  ["CERVEJA HEINEKEN LATA 269ml", "63519"],
  ["CERVEJA HEINEKEN LATA 350ML", "6197"],
  ["CERVEJA HEINEKEN LN 0% 330ML", "51532"],
  ["CERVEJA HEINEKEN LN 330ML", "12346"],
  ["CERVEJA SPATEN N LN 355ml", "53706"],
  ["CERVEJA STELLA ARTOIS 330ML", "51904"],
  ["CERVEJA STELLA ARTOIS S/GLUTEN 330ML", "51902"],
  ["COALHADA ATI LATTE DESN 170G", "5958"],
  ["COALHADA ATI LATTE NATURAL 170G", "5958"],
  ["CREME DE LEITE NESTLE TP 200G", "1123"],
  ["DESODORANTE NIVEA AERO FEMININO DRY COMFORT 90G", "3837"],
  ["DESODORANTE NIVEA AERO PEARL BEAUTY 150ML", "3844"],
  ["DESODORANTE NIVEA AERO SILVER 150ML", "3841"],
  ["DESODORANTE NIVEA AEROSSOL S/ PERFUME 150ML", "3841"],
  ["DETERGENTE LIQ YPE CAPIM - LIMAO 500ml", "3217"],
  ["DETERGENTE LIQ YPE CLEAR 500ML", "3217"],
  ["DETERGENTE LIQ YPE COCO 500ML", "3217"],
  ["DETERGENTE LIQ YPE GEL CON NEO VIBES 416g", "59383"],
  ["DETERGENTE LIQ YPE GEL CONC NEO SENSES 416g", "11853"],
  ["DETERGENTE LIQ YPE GELCONC NEO ENERGY 416g", "11853"],
  ["DETERGENTE LIQ YPE LIMAO 500ML", "3217"],
  ["DETERGENTE LIQ YPE MACA 500ML", "3217"],
  ["DETERGENTE LIQ YPE NEUTRO TODOS 500ML", "3217"],
  ["FARINHA DE TRIGO DONA BENTA 1kg", "6404"],
  ["IOG ATI LATTE DESNATADO 170G", "64961"],
  ["IOG ATI LATTE NAT INT COPO 170G", "64961"],
  ["IOG DANONE DANONINHO QJ P SUISSE MULTI SAB 320G", "12710"],
  ["IOG MOO MEL/COCO E NIBS DE CACAU 130g", "0"],
  ["IOG MOO TOQUE DE MEL 130g", "0"],
  ["IOG MOO TOQUE DE MEL E MANGA 130g", "0"],
  ["IOG MOO TOQUE DE MEL E PESSEGO130g", "0"],
  ["IOG NESTLE NATURAL CEN/LAR/MEL 170G ", "8289"],
  ["IOG NESTLE NATURAL DESNATADO 160G ", "8289"],
  ["IOG NESTLE NATURAL MEL 170G ", "8289"],
  ["IOG NESTLE NATURAL TRADICIONAL 170G ", "8289"],
  ["LAVA ROUPAS EM PO SANITIZA E HIGIENIZA OMO 800g", "52888"],
  ["LEITE CONDMOCA NESTLE LT 395G", "1126"],
  ["LEITE EM PO NINHO LEPO INT NEW FORT+ 380g ", "57196"],
  ["LEITE ITAMBE DESNATADO NOLAC 1L", "15668"],
  ["LEITE PIRACANJUBA DESNATADO C/T 1l", "65513"],
  ["LEITE PIRACANJUBA INTEGRAL C/T 1l", "49183"],
  ["LEITE PIRACANJUBA SEMIDES A2 C/T 1l", "64334"],
  ["LEITE PIRACANJUBA SEMIDESN C/T 1l", "49208"],
  ["LEITE SHEFA GARRAFA DESNATADO 1L", "1650"],
  ["LEITE SHEFA GARRAFA INTEGRAL 1L", "1650"],
  ["LEITE SHEFA GARRAFA SEMI DESN 1L", "1650"],
  ["LEITE SHEFA GARRAFA SEMI DESN S/LACTOSE 1L", "1653"],
  ["LEITE T-A XANDO DESNATADO LIGHT 1L", "9511"],
  ["LEITE T-A XANDO INTEGRAL 1L", "9511"],
  ["LEITE T-A XANDO INTEGRAL A2 1L", "0"],
  ["LEITE T-A XANDO MAGRO 1L", "9511"],
  ["LEITE T-A XANDO ZERO LACTOSE 1L", "15894"],
  ["MAIONESE HELLMANN S 500G", "7991"],
  ["MANTEIGA AVIACAO POTE C/SAL 200G", "8533"],
  ["MANTEIGA AVIACAO POTE S/SAL 200G", "8532"],
  ["MARGARINA QUALY VEG CREMOSA C/SAL 500G", "8348"],
  ["MARGARINA QUALY VEG CREMOSA S/SAL 500G", "8347"],
  ["MARGARINA.QUALY VITA CREME VEG C/SAL 500g", "8347"],
  ["MARGARINA.QUALY VITA CREME VEG S/SAL 500g", "8347"],
  ["PAPEL HIGIENICO NEVE NEUTRO BCO C/12", "65431"],
  ["QUEIJO MINAS FRESCAL FAZ BELA VISTA PC kg", "46520"],
  ["REFRIGERANTE COCA COLA LATA 350mL", "11022"],
  ["REFRIGERANTE COCA COLA LT 220mL", "14603"],
  ["REFRIGERANTE COCA COLA PET 2L", "10948"],
  ["REFRIGERANTE COCA COLA PET 600mL", "11021"],
  ["REFRIGERANTE COCA COLA ZERO LATA 350ML", "11023"],
  ["REFRIGERANTE COCA COLA ZERO LT 220mL", "13217"],
  ["REFRIGERANTE COCA COLA ZERO PET 2L", "10951"],
  ["REFRIGERANTE COCA COLA ZERO PET 600 ML", "11024"],
  ["REFRIGERANTE FANTA LARANJA PET 2L", "5488"],
  ["REFRIGERANTE GUARANA ANTARCTICA PET 2L", "5428"],
  ["REFRIGERANTE H2OH CITRUS 1,5L", "5673"],
  ["SABAO EM PO LAVAGEM PERFEITA OMO 800g", "48498"],
  ["SABAO EM PO PURO CUIDADO OMO 800g", "0"],
  ["SORVETE KIBON CHICABON 1,5L", "5606"],
  ["SORVETE KIBON CHICABON ZERO 800ML", "52613"],
  ["SORVETE KIBON CREME 1,5L", "13118"],
  ["SORVETE KIBON CREMOSISSIMO CHOCOLATE 1,5L", "53770"],
  ["SORVETE KIBON CREMOSISSIMO NAPOLITANO 1,5L", "16047"],
  ["SORVETE KIBON FLOCOS 1,5L", "13119"],
  ["SORVETE KIBON PASSAS AO RUM TODOS 1,5L", "0"],
  ["SORVETE KIBON SORVETERIA TENTACAO 1,5L", "0"],
  ["SUCO AURORA UVA TINTO 1,5L", "184"],
  ["SUCO AURORA UVA TINTO ORG 1L", "62678"],
  ["SUCO NATURAL ONE GOIABA 900ML", "54913"],
  ["SUCO NATURAL ONE LARANJA INTEGRAL 900ML", "8186"],
  ["SUCO NATURAL ONE LIMONADA INTEGRAL 900ML", "8184"],
  ["SUCO NATURAL ONE MACA INTEGRAL 900ML", "49345"],
  ["SUCO NATURAL ONE MACA LIMAO FRAMBOESA 900ML", "0"],
  ["SUCO NATURAL ONE MANGA INTEGRAL 900ML", "8181"],
  ["SUCO NATURAL ONE UVA C/ MACA 900ML", "49349"],
  ["SUCO XANDO LARANJA 900ML", "54939"],
  ["SUCO XANDO LIMONADA SICILIANA 900ML", "0"],
  ["SUCO XANDO MIX 900ML", "0"],
  ["SUCO YAKULT MACA 200ML", "0"],
  ["VODKA SMIRNOFF 998ML", "5931"],
  ["VODKA SMIRNOFF ICE LT 269ml", "42930"],
  ["YAKULT 480G C/6", "7190"],
];
const iDPacucar = [
  ["ACHOCOLATADO EM PO TODDY ORIGINAL LT 370G", "1376194"],
  ["ACHOCOLATADO NESCAU ACT-GO 370G", "704816"],
  ["ACUCAR CRISTAL UNIAO 1kg", "162802"],
  ["AGUA MINERAL MINALBA S/G 1,5L", "71969"],
  ["AGUA MINERAL MINALBA S/G 8x1,5L", "0"],
  ["AGUA SANITARIA YPE 2L", "383523"],
  ["AGUA TONICA ANTARCTICA DIET LATA 350ML", "128632"],
  ["AGUA TONICA ANTARCTICA LATA 350ML", "70947"],
  ["AZEITE EXTRA VIRGEM VD ANDORINHA 500ML", "86559"],
  ["BISNAGUINHA PANCO 300G", "146389"],
  ["CAFE 3 CORACOES EXTRA FORTE 500G", "47882"],
  ["CAFE 3 CORACOES TRADICIONAL 500G", "82810"],
  ["CAFE MELITTA EXTRA FORTE 500G", "166290"],
  ["CAFE MELITTA TRADICIONAL 500G ", "37565"],
  ["CERVEJA AMSTEL 350ML", "324900"],
  ["CERVEJA AMSTEL ULTRA 269ML", "788816"],
  ["CERVEJA AMSTEL ULTRA LN 275ml", "788814"],
  ["CERVEJA BECKS LATA SLEEK 350ml", "458399"],
  ["CERVEJA HEINEKEN 600ML", "105770"],
  ["CERVEJA HEINEKEN LATA 0% 350ML", "462217"],
  ["CERVEJA HEINEKEN LATA 250ML", "0"],
  ["CERVEJA HEINEKEN LATA 269ml", "284066"],
  ["CERVEJA HEINEKEN LATA 350ML", "21862"],
  ["CERVEJA HEINEKEN LN 0% 330ML", "462218"],
  ["CERVEJA HEINEKEN LN 330ML", "340565"],
  ["CERVEJA SPATEN N LN 355ml", "583961"],
  ["CERVEJA STELLA ARTOIS 330ML", "452630"],
  ["CERVEJA STELLA ARTOIS S/GLUTEN 330ML", "470494"],
  ["COALHADA ATI LATTE DESN 170G", "386290"],
  ["COALHADA ATI LATTE NATURAL 170G", "386290"],
  ["CREME DE LEITE NESTLE TP 200G", "43804"],
  ["DESODORANTE NIVEA AERO FEMININO DRY COMFORT 90G", "137221"],
  ["DESODORANTE NIVEA AERO PEARL BEAUTY 150ML", "0"],
  ["DESODORANTE NIVEA AERO SILVER 150ML", "173710"],
  ["DESODORANTE NIVEA AEROSSOL S/ PERFUME 150ML", "1536237"],
  ["DETERGENTE LIQ YPE CAPIM - LIMAO 500ml", "58800"],
  ["DETERGENTE LIQ YPE CLEAR 500ML", "58800"],
  ["DETERGENTE LIQ YPE COCO 500ML", "58800"],
  ["DETERGENTE LIQ YPE GEL CON NEO VIBES 416g", "705582"],
  ["DETERGENTE LIQ YPE GEL CONC NEO SENSES 416g", "344295"],
  ["DETERGENTE LIQ YPE GELCONC NEO ENERGY 416g", "344295"],
  ["DETERGENTE LIQ YPE LIMAO 500ML", "58800"],
  ["DETERGENTE LIQ YPE MACA 500ML", "58800"],
  ["DETERGENTE LIQ YPE NEUTRO TODOS 500ML", "58800"],
  ["FARINHA DE TRIGO DONA BENTA 1kg", "43619"],
  ["IOG ATI LATTE DESNATADO 170G", "386290"],
  ["IOG ATI LATTE NAT INT COPO 170G", "386290"],
  ["IOG DANONE DANONINHO QJ P SUISSE MULTI SAB 320G", "346314"],
  ["IOG MOO MEL/COCO E NIBS DE CACAU 130g", "0"],
  ["IOG MOO TOQUE DE MEL 130g", "0"],
  ["IOG MOO TOQUE DE MEL E MANGA 130g", "0"],
  ["IOG MOO TOQUE DE MEL E PESSEGO130g", "0"],
  ["IOG NESTLE NATURAL CEN/LAR/MEL 170G ", "140704"],
  ["IOG NESTLE NATURAL DESNATADO 160G ", "140704"],
  ["IOG NESTLE NATURAL MEL 170G ", "140704"],
  ["IOG NESTLE NATURAL TRADICIONAL 170G ", "140704"],
  ["LAVA ROUPAS EM PO SANITIZA E HIGIENIZA OMO 800g", "468932"],
  ["LEITE CONDMOCA NESTLE LT 395G", "50670"],
  ["LEITE EM PO NINHO LEPO INT NEW FORT+ 380g ", "586550"],
  ["LEITE ITAMBE DESNATADO NOLAC 1L", "324809"],
  ["LEITE PIRACANJUBA DESNATADO C/T 1l", "140374"],
  ["LEITE PIRACANJUBA INTEGRAL C/T 1l", "164065"],
  ["LEITE PIRACANJUBA SEMIDES A2 C/T 1l", "0"],
  ["LEITE PIRACANJUBA SEMIDESN C/T 1l", "43463"],
  ["LEITE SHEFA GARRAFA DESNATADO 1L", "223020"],
  ["LEITE SHEFA GARRAFA INTEGRAL 1L", "223020"],
  ["LEITE SHEFA GARRAFA SEMI DESN 1L", "223020"],
  ["LEITE SHEFA GARRAFA SEMI DESN S/LACTOSE 1L", "0"],
  ["LEITE T-A XANDO DESNATADO LIGHT 1L", "0"],
  ["LEITE T-A XANDO INTEGRAL 1L", "0"],
  ["LEITE T-A XANDO INTEGRAL A2 1L", "1286772"],
  ["LEITE T-A XANDO MAGRO 1L", "85468"],
  ["LEITE T-A XANDO ZERO LACTOSE 1L", "346815"],
  ["MAIONESE HELLMANN S 500G", "19389"],
  ["MANTEIGA AVIACAO POTE C/SAL 200G", "6971"],
  ["MANTEIGA AVIACAO POTE S/SAL 200G", "0"],
  ["MARGARINA QUALY VEG CREMOSA C/SAL 500G", "71812"],
  ["MARGARINA QUALY VEG CREMOSA S/SAL 500G", "72251"],
  ["MARGARINA.QUALY VITA CREME VEG C/SAL 500g", "0"],
  ["MARGARINA.QUALY VITA CREME VEG S/SAL 500g", "0"],
  ["PAPEL HIGIENICO NEVE NEUTRO BCO C/12", "568597"],
  ["QUEIJO MINAS FRESCAL FAZ BELA VISTA PC kg", "34937"],
  ["REFRIGERANTE COCA COLA LATA 350mL", "116609"],
  ["REFRIGERANTE COCA COLA LT 220mL", "361295"],
  ["REFRIGERANTE COCA COLA PET 2L", "449568"],
  ["REFRIGERANTE COCA COLA PET 600mL", "155197"],
  ["REFRIGERANTE COCA COLA ZERO LATA 350ML", "74949"],
  ["REFRIGERANTE COCA COLA ZERO LT 220mL", "361295"],
  ["REFRIGERANTE COCA COLA ZERO PET 2L", "59785"],
  ["REFRIGERANTE COCA COLA ZERO PET 600 ML", "15428"],
  ["REFRIGERANTE FANTA LARANJA PET 2L", "12767"],
  ["REFRIGERANTE GUARANA ANTARCTICA PET 2L", "11428"],
  ["REFRIGERANTE H2OH CITRUS 1,5L", "116915"],
  ["SABAO EM PO LAVAGEM PERFEITA OMO 800g", "468932"],
  ["SABAO EM PO PURO CUIDADO OMO 800g", "440142"],
  ["SORVETE KIBON CHICABON 1,5L", "285805"],
  ["SORVETE KIBON CHICABON ZERO 800ML", "470549"],
  ["SORVETE KIBON CREME 1,5L", "347350"],
  ["SORVETE KIBON CREMOSISSIMO CHOCOLATE 1,5L", "478516"],
  ["SORVETE KIBON CREMOSISSIMO NAPOLITANO 1,5L", "0"],
  ["SORVETE KIBON FLOCOS 1,5L", "347351"],
  ["SORVETE KIBON PASSAS AO RUM TODOS 1,5L", "0"],
  ["SORVETE KIBON SORVETERIA TENTACAO 1,5L", "0"],
  ["SUCO AURORA UVA TINTO 1,5L", "0"],
  ["SUCO AURORA UVA TINTO ORG 1L", "1376488"],
  ["SUCO NATURAL ONE GOIABA 900ML", "0"],
  ["SUCO NATURAL ONE LARANJA INTEGRAL 900ML", "292149"],
  ["SUCO NATURAL ONE LIMONADA INTEGRAL 900ML", "0"],
  ["SUCO NATURAL ONE MACA INTEGRAL 900ML", "292195"],
  ["SUCO NATURAL ONE MACA LIMAO FRAMBOESA 900ML", "0"],
  ["SUCO NATURAL ONE MANGA INTEGRAL 900ML", "292386"],
  ["SUCO NATURAL ONE UVA C/ MACA 900ML", "339050"],
  ["SUCO XANDO LARANJA 900ML", "461619"],
  ["SUCO XANDO LIMONADA SICILIANA 900ML", "0"],
  ["SUCO XANDO MIX 900ML", "615961"],
  ["SUCO YAKULT MACA 200ML", "138477"],
  ["VODKA SMIRNOFF 998ML", "134026"],
  ["VODKA SMIRNOFF ICE LT 269ml", "347925"],
  ["YAKULT 480G C/6", "106572"],
];
const urlPgmenos = [
  [
    "ACHOCOLATADO EM PO TODDY ORIGINAL LT 370G",
    "https://www.superpaguemenos.com.br/achocolatado-toddy-original-370g/p",
  ],
  [
    "ACHOCOLATADO NESCAU ACT-GO 370G",
    "https://www.superpaguemenos.com.br/achocol-nescau-370g-lt-activ-go/p",
  ],
  [
    "ACUCAR CRISTAL UNIAO 1kg",
    "https://www.superpaguemenos.com.br/acucar-uniao-1kg-cristalcucar/p",
  ],
  ["AGUA MINERAL MINALBA S/G 1,5L", "0"],
  ["AGUA MINERAL MINALBA S/G 8x1,5L", "0"],
  [
    "AGUA SANITARIA YPE 2L",
    "https://www.superpaguemenos.com.br/agua-sanitaria-ype-2l/p",
  ],
  [
    "AGUA TONICA ANTARCTICA DIET LATA 350ML",
    "https://www.superpaguemenos.com.br/agua-tonica-antarctica-diet-350ml/p",
  ],
  [
    "AGUA TONICA ANTARCTICA LATA 350ML",
    "https://www.superpaguemenos.com.br/agua-tonica-antarctica-350ml/p",
  ],
  [
    "AZEITE EXTRA VIRGEM VD ANDORINHA 500ML",
    "https://www.superpaguemenos.com.br/azeite-portugues-andorinha-extra-virgem-500ml/p",
  ],
  [
    "BISNAGUINHA PANCO 300G",
    "https://www.superpaguemenos.com.br/pao-bisnaguinha-panco-300g/p",
  ],
  [
    "CAFE 3 CORACOES EXTRA FORTE 500G",
    "https://www.superpaguemenos.com.br/cafe-3-coracoes-extra-forte-500g/p",
  ],
  [
    "CAFE 3 CORACOES TRADICIONAL 500G",
    "https://www.superpaguemenos.com.br/cafe-3-coracoes-tradicional-500g/p",
  ],
  [
    "CAFE MELITTA EXTRA FORTE 500G",
    "https://www.superpaguemenos.com.br/cafe-melitta-extra-forte-500g/p",
  ],
  [
    "CAFE MELITTA TRADICIONAL 500G ",
    "https://www.superpaguemenos.com.br/cafe-melitta-tradicional-a-vacuo-500g/p",
  ],
  [
    "CERVEJA AMSTEL 350ML",
    "https://www.superpaguemenos.com.br/cerveja-amstel-350ml/p",
  ],
  [
    "CERVEJA AMSTEL ULTRA 269ML",
    "https://www.superpaguemenos.com.br/cerveja-amstel-269ml-lt-ultra/p",
  ],
  [
    "CERVEJA AMSTEL ULTRA LN 275ml",
    "https://www.superpaguemenos.com.br/cerveja-amstel-275ml-ln-ultra/p",
  ],
  ["CERVEJA BECKS LATA SLEEK 350ml", "0"],
  [
    "CERVEJA HEINEKEN 600ML",
    "https://www.superpaguemenos.com.br/cerveja-heineken-600ml/p",
  ],
  [
    "CERVEJA HEINEKEN LATA 0% 350ML",
    "https://www.superpaguemenos.com.br/cerveja-heineken-350ml-lt-00-lager-premium/p",
  ],
  ["CERVEJA HEINEKEN LATA 250ML", "0"],
  [
    "CERVEJA HEINEKEN LATA 269ml",
    "https://www.superpaguemenos.com.br/cerveja-heineken-269ml-lt-puro-malte/p",
  ],
  [
    "CERVEJA HEINEKEN LATA 350ML",
    "https://www.superpaguemenos.com.br/cerveja-heineken-350ml/p",
  ],
  [
    "CERVEJA HEINEKEN LN 0% 330ML",
    "https://www.superpaguemenos.com.br/cerveja-heineken-330ml-lneck-00/p",
  ],
  [
    "CERVEJA HEINEKEN LN 330ML",
    "https://www.superpaguemenos.com.br/cerveja-heineken-long-neck-330ml/p",
  ],
  [
    "CERVEJA SPATEN N LN 355ml",
    "https://www.superpaguemenos.com.br/cerveja-spaten-355ml-l-neck-puro-malte/p",
  ],
  ["CERVEJA STELLA ARTOIS 330ML", "0"],
  [
    "CERVEJA STELLA ARTOIS S/GLUTEN 330ML",
    "https://www.superpaguemenos.com.br/cerveja-stella-artois-premium-lager-long-neck-330ml/p",
  ],
  ["COALHADA ATI LATTE DESN 170G", "0"],
  [
    "COALHADA ATI LATTE NATURAL 170G",
    "https://www.superpaguemenos.com.br/coalhada-atilatte-170g-int-natural/p",
  ],
  [
    "CREME DE LEITE NESTLE TP 200G",
    "https://www.superpaguemenos.com.br/creme-de-leite-nestle-200g/p",
  ],
  [
    "DESODORANTE NIVEA AERO FEMININO DRY COMFORT 90G",
    "https://www.superpaguemenos.com.br/desodorante-nivea-aerosol-feminino-dry-comfort-150ml/p",
  ],
  [
    "DESODORANTE NIVEA AERO PEARL BEAUTY 150ML",
    "https://www.superpaguemenos.com.br/nivea-antitranspirante-pearl-beauty-aerosol-150ml/p",
  ],
  [
    "DESODORANTE NIVEA AERO SILVER 150ML",
    "https://www.superpaguemenos.com.br/desodorante-nivea-aerosol-masculino-silver-protect-150ml/p",
  ],
  ["DESODORANTE NIVEA AEROSSOL S/ PERFUME 150ML", "0"],
  [
    "DETERGENTE LIQ YPE CAPIM - LIMAO 500ml",
    "https://www.superpaguemenos.com.br/detergente-ype-capim-limao-500ml/p",
  ],
  [
    "DETERGENTE LIQ YPE CLEAR 500ML",
    "https://www.superpaguemenos.com.br/detergente-ype-clear-500ml/p",
  ],
  [
    "DETERGENTE LIQ YPE COCO 500ML",
    "https://www.superpaguemenos.com.br/detergente-ype-coco-500ml/p",
  ],
  ["DETERGENTE LIQ YPE GEL CON NEO VIBES 416g", "0"],
  [
    "DETERGENTE LIQ YPE GEL CONC NEO SENSES 416g",
    "https://www.superpaguemenos.com.br/detergente-gel-ype-clear-416g/p",
  ],
  [
    "DETERGENTE LIQ YPE GELCONC NEO ENERGY 416g",
    "https://www.superpaguemenos.com.br/detergente-gel-ype-neutro-416g/p",
  ],
  [
    "DETERGENTE LIQ YPE LIMAO 500ML",
    "https://www.superpaguemenos.com.br/detergente-ype-capim-limao-500ml/p",
  ],
  [
    "DETERGENTE LIQ YPE MACA 500ML",
    "https://www.superpaguemenos.com.br/detergente-ype-maca-500ml/p",
  ],
  [
    "DETERGENTE LIQ YPE NEUTRO TODOS 500ML",
    "https://www.superpaguemenos.com.br/detergente-ype-neutro-500ml/p",
  ],
  [
    "FARINHA DE TRIGO DONA BENTA 1kg",
    "https://www.superpaguemenos.com.br/farinha-de-trigo-dona-benta-tradiconal-1kg/p",
  ],
  [
    "IOG ATI LATTE DESNATADO 170G",
    "https://www.superpaguemenos.com.br/iog-atilatte-170g-desn/p",
  ],
  ["IOG ATI LATTE NAT INT COPO 170G", "0"],
  [
    "IOG DANONE DANONINHO QJ P SUISSE MULTI SAB 320G",
    "https://www.superpaguemenos.com.br/iogurte-infantil-danoninho-petit-suisse-morango-320g/p",
  ],
  ["IOG MOO MEL/COCO E NIBS DE CACAU 130g", "0"],
  ["IOG MOO TOQUE DE MEL 130g", "0"],
  ["IOG MOO TOQUE DE MEL E MANGA 130g", "0"],
  ["IOG MOO TOQUE DE MEL E PESSEGO130g", "0"],
  [
    "IOG NESTLE NATURAL CEN/LAR/MEL 170G ",
    "https://www.superpaguemenos.com.br/iogurte-natural-nestle-laranja-cenoura-e-mel-170g/p",
  ],
  [
    "IOG NESTLE NATURAL DESNATADO 160G ",
    "https://www.superpaguemenos.com.br/iogurte-natural-nestle-laranja-cenoura-e-mel-170g/p",
  ],
  [
    "IOG NESTLE NATURAL MEL 170G ",
    "https://www.superpaguemenos.com.br/iogurte-natural-nestle-laranja-cenoura-e-mel-170g/p",
  ],
  [
    "IOG NESTLE NATURAL TRADICIONAL 170G ",
    "https://www.superpaguemenos.com.br/iogurte-natural-nestle-laranja-cenoura-e-mel-170g/p",
  ],
  ["LAVA ROUPAS EM PO SANITIZA E HIGIENIZA OMO 800g", "0"],
  [
    "LEITE CONDMOCA NESTLE LT 395G",
    "https://www.superpaguemenos.com.br/leite-condensado-moca-395g/p",
  ],
  [
    "LEITE EM PO NINHO LEPO INT NEW FORT+ 380g ",
    "https://www.superpaguemenos.com.br/leite-po-ninho-380g-integral/p",
  ],
  ["LEITE ITAMBE DESNATADO NOLAC 1L", "0"],
  [
    "LEITE PIRACANJUBA DESNATADO C/T 1l",
    "https://www.superpaguemenos.com.br/leite-desnatado-longa-vida-piracanjuba-1l/p",
  ],
  [
    "LEITE PIRACANJUBA INTEGRAL C/T 1l",
    "https://www.superpaguemenos.com.br/leite-integral-longa-vida-piracanjuba-1l/p",
  ],
  ["LEITE PIRACANJUBA SEMIDES A2 C/T 1l", "0"],
  [
    "LEITE PIRACANJUBA SEMIDESN C/T 1l",
    "https://www.superpaguemenos.com.br/leite-semidesnatado-longa-vida-piracanjuba-1l/p",
  ],
  [
    "LEITE SHEFA GARRAFA DESNATADO 1L",
    "https://www.superpaguemenos.com.br/leite-desnatado-longa-vida-shefa-1l/p",
  ],
  [
    "LEITE SHEFA GARRAFA INTEGRAL 1L",
    "https://www.superpaguemenos.com.br/leite-integral-longa-vida-shefa-1l/p",
  ],
  [
    "LEITE SHEFA GARRAFA SEMI DESN 1L",
    "https://www.superpaguemenos.com.br/leite-longa-vida-semidesnatado-shefa-garrafa-1l/p",
  ],
  [
    "LEITE SHEFA GARRAFA SEMI DESN S/LACTOSE 1L",
    "https://www.superpaguemenos.com.br/leite-longa-vida-semidesnatado-shefa-zero-lactose-garrafa-1l/p",
  ],
  [
    "LEITE T-A XANDO DESNATADO LIGHT 1L",
    "https://www.superpaguemenos.com.br/leite-pasteurizado-desnatado-xando-tipo-a-light-garrafa-1l/p",
  ],
  [
    "LEITE T-A XANDO INTEGRAL 1L",
    "https://www.superpaguemenos.com.br/leite-pasteurizado-semidesnatado-xando-tipo-a-magro-1l/p",
  ],
  ["LEITE T-A XANDO INTEGRAL A2 1L", "0"],
  [
    "LEITE T-A XANDO MAGRO 1L",
    "https://www.superpaguemenos.com.br/leite-pasteurizado-semidesnatado-xando-tipo-a-magro-1l/p",
  ],
  [
    "LEITE T-A XANDO ZERO LACTOSE 1L",
    "https://www.superpaguemenos.com.br/leite-pasteurizado-semidesnatado-xando-tipo-a-sem-lactose-1l/p",
  ],
  [
    "MAIONESE HELLMANN S 500G",
    "https://www.superpaguemenos.com.br/maionese-hellmanns-500g/p",
  ],
  [
    "MANTEIGA AVIACAO POTE C/SAL 200G",
    "https://www.superpaguemenos.com.br/manteiga-aviacao-com-sal-200g/p",
  ],
  [
    "MANTEIGA AVIACAO POTE S/SAL 200G",
    "https://www.superpaguemenos.com.br/manteiga-aviacao-sem-sal-200g/p",
  ],
  [
    "MARGARINA QUALY VEG CREMOSA C/SAL 500G",
    "https://www.superpaguemenos.com.br/margarina-qualy-com-sal-500g/p",
  ],
  [
    "MARGARINA QUALY VEG CREMOSA S/SAL 500G",
    "https://www.superpaguemenos.com.br/margarina-qualy-sem-sal-500g/p",
  ],
  [
    "MARGARINA.QUALY VITA CREME VEG C/SAL 500g",
    "https://www.superpaguemenos.com.br/margarina-qualy-light-0-lactose-com-sal-500g/p",
  ],
  [
    "MARGARINA.QUALY VITA CREME VEG S/SAL 500g",
    "https://www.superpaguemenos.com.br/margarina-qualy-sem-sal-500g/p",
  ],
  [
    "PAPEL HIGIENICO NEVE NEUTRO BCO C/12",
    "https://www.superpaguemenos.com.br/papel-hig-neve-c12-l12-p11-fd/p",
  ],
  ["QUEIJO MINAS FRESCAL FAZ BELA VISTA PC kg", "0"],
  [
    "REFRIGERANTE COCA COLA LATA 350mL",
    "https://www.superpaguemenos.com.br/refrigerante-coca-cola-350ml/p",
  ],
  [
    "REFRIGERANTE COCA COLA LT 220mL",
    "https://www.superpaguemenos.com.br/refrigerante-coca-cola-220ml/p",
  ],
  [
    "REFRIGERANTE COCA COLA PET 2L",
    "https://www.superpaguemenos.com.br/refrigerante-coca-cola-2l/p",
  ],
  [
    "REFRIGERANTE COCA COLA PET 600mL",
    "https://www.superpaguemenos.com.br/refrigerante-coca-cola-600ml/p",
  ],
  [
    "REFRIGERANTE COCA COLA ZERO LATA 350ML",
    "https://www.superpaguemenos.com.br/refrigerante-coca-cola-zero-acucar-350ml/p",
  ],
  [
    "REFRIGERANTE COCA COLA ZERO LT 220mL",
    "https://www.superpaguemenos.com.br/refrigerante-coca-cola-zero-acucar-220ml/p",
  ],
  [
    "REFRIGERANTE COCA COLA ZERO PET 2L",
    "https://www.superpaguemenos.com.br/refrigerante-coca-cola-zero-acucar-2l/p",
  ],
  [
    "REFRIGERANTE COCA COLA ZERO PET 600 ML",
    "https://www.superpaguemenos.com.br/refrigerante-coca-cola-zero-acucar-600ml/p",
  ],
  [
    "REFRIGERANTE FANTA LARANJA PET 2L",
    "https://www.superpaguemenos.com.br/refrigerante-fanta-laranja-2l/p",
  ],
  [
    "REFRIGERANTE GUARANA ANTARCTICA PET 2L",
    "https://www.superpaguemenos.com.br/refrigerante-antarctica-guarana-2l/p",
  ],
  [
    "REFRIGERANTE H2OH CITRUS 1,5L",
    "https://www.superpaguemenos.com.br/refrigerante-h2oh-citrus-shrink-15l/p",
  ],
  ["SABAO EM PO LAVAGEM PERFEITA OMO 800g", "0"],
  ["SABAO EM PO PURO CUIDADO OMO 800g", "0"],
  [
    "SORVETE KIBON CHICABON 1,5L",
    "https://www.superpaguemenos.com.br/sorvete-kibon-cremosissimo-chicabom-15l/p",
  ],
  ["SORVETE KIBON CHICABON ZERO 800ML", "0"],
  [
    "SORVETE KIBON CREME 1,5L",
    "https://www.superpaguemenos.com.br/sorvete-kibon-cremosissimo-creme-15l/p",
  ],
  [
    "SORVETE KIBON CREMOSISSIMO CHOCOLATE 1,5L",
    "https://www.superpaguemenos.com.br/sorvete-kibon-15l-cremosissimo-chocolate/p",
  ],
  [
    "SORVETE KIBON CREMOSISSIMO NAPOLITANO 1,5L",
    "https://www.superpaguemenos.com.br/sorvete-kibon-cremosissimo-napolitano-15l/p",
  ],
  [
    "SORVETE KIBON FLOCOS 1,5L",
    "https://www.superpaguemenos.com.br/sorvete-kibon-cremosissimo-flocos-15l/p",
  ],
  ["SORVETE KIBON PASSAS AO RUM TODOS 1,5L", "0"],
  ["SORVETE KIBON SORVETERIA TENTACAO 1,5L", "0"],
  ["SUCO AURORA UVA TINTO 1,5L", "0"],
  ["SUCO AURORA UVA TINTO ORG 1L", "0"],
  ["SUCO NATURAL ONE GOIABA 900ML", "0"],
  [
    "SUCO NATURAL ONE LARANJA INTEGRAL 900ML",
    "https://www.superpaguemenos.com.br/suco-integral-natural-one-laranja-refrigerado-900ml/p",
  ],
  ["SUCO NATURAL ONE LIMONADA INTEGRAL 900ML", "0"],
  ["SUCO NATURAL ONE MACA INTEGRAL 900ML", "0"],
  [
    "SUCO NATURAL ONE MACA LIMAO FRAMBOESA 900ML",
    "https://www.superpaguemenos.com.br/suco-misto-natural-one-maca-limao-e-framboesa-900ml/p",
  ],
  ["SUCO NATURAL ONE MANGA INTEGRAL 900ML", "0"],
  [
    "SUCO NATURAL ONE UVA C/ MACA 900ML",
    "https://www.superpaguemenos.com.br/suco-integral-natural-one-uva-refrigerado-900ml/p",
  ],
  [
    "SUCO XANDO LARANJA 900ML",
    "https://www.superpaguemenos.com.br/suco-xando-900ml-laranja/p",
  ],
  ["SUCO XANDO LIMONADA SICILIANA 900ML", "0"],
  ["SUCO XANDO MIX 900ML", "0"],
  [
    "SUCO YAKULT MACA 200ML",
    "https://www.superpaguemenos.com.br/suco-yakult-maca-refrigerado-200ml/p",
  ],
  [
    "VODKA SMIRNOFF 998ML",
    "https://www.superpaguemenos.com.br/vodka-smirnoff-red-998ml/p",
  ],
  ["VODKA SMIRNOFF ICE LT 269ml", "0"],
  [
    "YAKULT 480G C/6",
    "https://www.superpaguemenos.com.br/leite-fermentado-yakult-com-6-unidades/p",
  ],
];
const workbook = new excel.Workbook();

const worksheet = workbook.addWorksheet("Pesquisa de preços");

const style = workbook.createStyle({
  font: {
    color: "#000000",
    size: 12,
  },
  numberFormat: "$#,##0.00; ($#,##0.00); -",
});

async function getPrices() {
  let count = 2;
  worksheet.cell(1, 2).string("Dalben").style(style);
  worksheet.cell(1, 3).string("Pão de açucar").style(style);
  worksheet.cell(1, 4).string("Pague menos").style(style);

  //PESQUISA DALBEN
  for (i in idDalben) {
    await axios
      .get(
        `https://api.superdalben.com.br/v1/loja/produtos/${idDalben[i][1]}/filial/1/centro_distribuicao/1/detalhes`,
        {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/16.16299",
            Authorization: `Bearer ${process.env.TOKEN}`,
          },
        }
      )
      .then((response) => {
        const data = response.data.data;

        if (data.produto.disponivel) {
          worksheet.cell(count, 1).string(idDalben[i][0]).style(style);
          worksheet
            .cell(count, 2)
            .number(parseFloat(data.produto.preco))
            .style(style);
          console.log(idDalben[i][0] + ": R$ " + data.produto.preco);
        } else {
          worksheet.cell(count, 1).string(idDalben[i][0]).style(style);
          worksheet.cell(count, 2).string("INDISPONIVEL").style(style);
          console.log(idDalben[i][0] + ": INDISPONIVEL");
        }
      })
      .catch((error) => {
        worksheet.cell(count, 1).string(idDalben[i][0]).style(style);
        worksheet.cell(count, 2).string("NaN").style(style);
        console.log(idDalben[i][0] + ": Não encontrado");
      });
    count++;
  }

  count = 2;

  //PESQUISA PAO DE ACUCAR
  for (i in iDPacucar) {
    await axios
      .get(
        `https://api.gpa.digital/pa/v4/products/ecom/${iDPacucar[i][1]}/bestPrices?storeId=461&sellType=&isClienteMais=true`
      )
      .then((response) => {
        const data = response.data;
        const price = data.content.sellInfos[0].priceFrom
          ? data.content.sellInfos[0].priceFrom
          : data.content.sellInfos[0].currentPrice;
        worksheet.cell(count, 3).number(parseFloat(price)).style(style);
        console.log(iDPacucar[i][0] + ": R$ " + price);
      })
      .catch((error) => {
        worksheet.cell(count, 3).string("NaN").style(style);
        console.log(iDPacucar[i][0] + ": Não encontrado");
      });
    count++;
  }

  count = 2;

  //PESQUISA PAGMENOS
  for (i in urlPgmenos) {
    await axios
      .get(urlPgmenos[i][1])
      .then((response) => {
        const html = response.data;
        const $ = cheerio.load(html);
        const container = $(".box-pricing");
        const price = $(container).find(".price_off").text();

        worksheet.cell(count, 4).string(price).style(style);
        console.log(urlPgmenos[i][0] + ": R$: " + price);
      })
      .catch((error) => {
        worksheet.cell(count, 4).string("NaN").style(style);
        console.log(urlPgmenos[i][0] + ": Não encontrado");
      });
    count++;
  }
  const filePath = path.join(__dirname, "../", "Pesquisa-Notaveis.xlsx");
  workbook.write(filePath);
}

getPrices();
