# Genetics Stuff

## Overview

`allele-concat`

User interface for selecting three alleles for concatenation. It also adds colored-cored xyzw markers to the sequence.

`duplex-triplex-simulation`

Conducts a probabilistic simulation of multiplex (though only duplex and triplex are supported) drug administration given that we know the probabilities of being able to treat each given condition.

`t-cell-gene-analysis`

This program reads a JSON file with annotated gene sequences (there is an example file `consensus_annotations.json`). It analyzes the sequence for rare codons and restriction enzymes, then figures out which codons need to be swapped out for what to resolve the issue.
