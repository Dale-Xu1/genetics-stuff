let titles = ['Start', 'End', 'Feature Chain', 'Gene Name', 'Region Type', 'Sequence Type'];
function load(file, callback) {   
  let oReq = new XMLHttpRequest();
  oReq.overrideMimeType("application/json");
  oReq.open('GET', file, true);
  oReq.onreadystatechange = function () {if (oReq.readyState === 4 && oReq.status == '200') callback(oReq.responseText);};
  oReq.send(null);
}
String.prototype.replaceAt=function(index, replacement) {return this.substr(0, index)+replacement+this.substr(index+replacement.length);}
//X and Y replacements
let x = 'ACATTCAAAACCCAGAACCCGCCGTCTACCAGCTGAAAGACCCGAGGTCTCAAGACTCTACGTTGTGCTTGTTCACCGATTTCGACAGTCAGATAAATGTGCCTAAGACCATGGAGAGTGGCACTTTCATCACTGACAAATGTGTGTTGGACATGAAGGCTATGGACAGCAAGTCAAACGGCGCGATTGCTTGGTCCAACCAAACTTCTTTCACGTGCCAGGACATCTTCAAGGAGACAAACGCCACCTATCCATCCTCTGATGTTCCGTGCGATGCGACTCTTACCGAGAAAAGCTTCGAGACGGACATGAACTTGAACTTCCAAAACCTGCTTGTGATGGTACTGCGAATACTTCTTCTTAAGGTGGCGGGCTTCAATTTGCTCATGACACTCAGACTTTGGTCTAGC';
let y = 'AAGATCTTCGAAACGTAACCCCTCCAAAAGTGAGTCTCTTTGAACCGAGTAAGGCTGAGATCGCGAACAAACAAAAGGCGACCCTCGTCTGTCTTGCGCGAGGATTTTTTCCCGACCACGTGGAGTTGTCTTGGTGGGTAAACGGTAAGGAAGTACACAGCGGTGTTTGCACCGACCCTCAAGCCTACAAGGAATCTAACTATTCATACTGCCTTTCATCCCGACTTAGGGTTTCTGCTACCTTTTGGCACAATCCGAGGAATCACTTTAGGTGTCAAGTACAGTTCCACGGATTGTCAGAGGAGGATAAATGGCCGGAGGGCTCCCCGAAGCCGGTTACGCAGAACATTAGTGCGGAAGCCTGGGGACGAGCAGACTGCGGTATCACGTCTGCCAGCTATCAGCAAGGCGTTCTGTCAGCGACAATTCTGTACGAAATACTTTTGGGTAAGGCTACATTGTATGCGGTATTGGTGTCTACGCTGGTAGTCATGGCCATGGTGAAACGAAAAAACTCA';
let data, rareCodons, goodCodons, rstrEnzyme;
rstrEnzyme = {
  "EcoRI": "GAATTC",
  "BamHI": "GGATCC"}
  rareCodons = {
  "TTA": "L",
  "CTA": "L",
  "ATA": "I",
  "GTA": "V",
  "TCG": "S",
  "CCG": "P",
  "ACG": "T",
  "GCG": "A",
  "CGA": "R",
  "CGT": "R"
}
goodCodons = {
  "TTT": "F",
  "CTT": "L",
  "ATT": "I",
  "GTT": "V",
  "TTC": "F",
  "CTC": "L",
  "ATC": "I",
  "GTC": "V",
  "TTG": "L",
  "CTG": "L",
  "ATG": "M",
  "GTG": "V",
  "TCT": "S",
  "CCT": "P",
  "ACT": "T",
  "GCT": "A",
  "TCC": "S",
  "CCC": "P",
  "ACC": "T",
  "GCC": "A",
  "TCA": "S",
  "CCA": "P",
  "ACA": "T",
  "GCA": "A",
  "TAT": "Y",
  "CAT": "H",
  "AAT": "N",
  "GAT": "D",
  "TAC": "Y",
  "CAC": "H",
  "AAC": "N",
  "GAC": "D",
  "TAA": "Stop",
  "CAA": "Q",
  "AAA": "K",
  "GAA": "E",
  "TAG": "Stop",
  "CAG": "Q",
  "AAG": "K",
  "GAG": "E",
  "TGT": "C",
  "AGT": "S",
  "GGT": "G",
  "TGC": "C",
  "CGC": "R",
  "AGC": "S",
  "GGC": "G",
  "TGA": "Stop",
  "AGA": "R",
  "GGA": "G",
  "TGG": "W",
  "CGG": "R",
  "AGG": "R",
  "GGG": "G"
}

document.getElementById('ca').addEventListener('change', (event) => {
  let reader = new FileReader();
  reader.readAsText(event.target.files[0]);
  reader.onload = () => {
    data = JSON.parse(reader.result);
    if (data !== undefined && rareCodons !== undefined && goodCodons !== undefined && rstrEnzyme !== undefined) {
      let extracted = [];
      //Extracting data
      for (let i = 0; i < data.length; i++) {
        extracted[i] = [];
        //Getting data for each annotation
        for (let j = 0; j < data[i].annotations.length; j++) {
          extracted[i][j] = {
            start: data[i].annotations[j].contig_match_start,
            end: data[i].annotations[j].contig_match_end,
            featureChain: data[i].annotations[j].feature.chain,
            geneName: data[i].annotations[j].feature.gene_name,
            regionType: data[i].annotations[j].feature.region_type,
            sequenceType: data[i].sequence.slice(data[i].annotations[j].contig_match_start, data[i].annotations[j].contig_match_end)
          };
        }
        //Sorting data
        for (let a = 1; a < extracted[i].length; a++) {
          for (let j = a; j > 0; j--) {
            if (extracted[i][j].start < extracted[i][j-1].start) {
              //Swapping
              let temp = extracted[i][j];
              extracted[i][j] = extracted[i][j-1];
              extracted[i][j-1] = temp;
            } else break;
          }
        }
        //Making sure length is multiple of 3
        let end = extracted[i][extracted[i].length-1].start;
        switch ((data[i].start_codon_pos-end)%3) {
          case 1:
            end--;
            break;
          case 2:
            end++;
            break;
        }
        extracted[i].push(data[i].clonotype);
        //Replacing rare codons with good codons
        let seq = data[i].sequence.slice(data[i].start_codon_pos, end);
        extracted[i].push(seq.slice());
        for (let j = 0; j < seq.length; j += 3) {
          let index = rareCodons[seq.slice(j, j+3)];
          //If codon is rare
          if (index !== undefined) {
            //Searching for match and overwriting
            for (let g in goodCodons) if (goodCodons[g] === index) {
              seq = seq.replaceAt(j, g);
              break;
            }
          }
        }
        extracted[i].push(seq.slice());
        for (let en in rstrEnzyme) {
          //Searching for enzyme
          for (let j = 0; j < seq.length-rstrEnzyme[en].length+1; j++) if (seq.slice(j, j+rstrEnzyme[en].length) === rstrEnzyme[en]) {
            //Snapping to codon
            let codonStart = Math.ceil(j/3)*3;
            let cd = seq.slice(codonStart, codonStart+3)
            //Overwritting string
            let index = goodCodons[cd];
            for (let g in goodCodons) if (goodCodons[g] === index && g !== cd) {
              seq = seq.replaceAt(codonStart, g);
              break;
            }
          }
        }
        extracted[i].push(seq);
      }
      for (let a = 0; a < extracted.length; a++) {
        let clonotype = document.createElement('p');
        clonotype.innerText = extracted[a][extracted[a].length-4];
        document.body.appendChild(clonotype);
        //Creating table
        let table = document.createElement('table');
        document.body.appendChild(table);
        table.appendChild(document.createElement('tr'));
        for (let i = 0; i < 6; i++) {
          let elt = document.createElement('th');
          elt.innerText = titles[i];
          table.children[0].appendChild(elt);
        }
        //Adding data
        for (let i = 0; i < extracted[a].length-4; i++) {
          table.appendChild(document.createElement('tr'));
          for (let info in extracted[a][i]) {
            let elt = document.createElement('td');
            elt.innerText = extracted[a][i][info];
            table.children[i+1].appendChild(elt);
          }
        }
        let tag;
        if (extracted[a][extracted[a].length-5].geneName === 'TRAC') tag = 0;
        else tag = 1;
        //Writing out codon
        for (let i = 0; i < 3; i++) {
          let codon = document.createElement('a');
          codon.innerText = extracted[a][extracted[a].length-3+i];
          document.body.appendChild(codon);
          //Additional tag
          let t = document.createElement('a');
          if (tag === 0) {
            t.innerText = x;
            t.style.color = 'rgb(255, 0, 0)';
          } else {
            t.innerText = y;
            t.style.color = 'rgb(0, 255, 0)';
          }
          document.body.appendChild(t);
          document.body.appendChild(document.createElement('br'));
        }
        let length = document.createElement('a');
        let num = extracted[a][extracted[a].length-1].length;
        if (tag === 0) num += x.length;
        else num += y.length;
        length.innerText = 'Length: '+num;
        document.body.appendChild(length);
      }
    } else console.error('All files must be inputted');
  }
});
