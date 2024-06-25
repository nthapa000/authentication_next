#include<bits/stdc++.h>
using namespace std;

class Occurence{
    public:
        pair<string,vector<string>> Neighbours(vector<string> words){
            pair<string,vector<string>> res;
            int lenWords = words.size();
            for(int i=0;i<lenWords;i++){
                string currentWord=words[i];
                int sizeOfWord=currentWord.size();
                for(int j=0;j<sizeOfWord;j++){
                    string currentWord="";
                    char c=currentWord[j];
                    if(c==' ' || c=='.'){
                        res.first=currentWord;
                        for(int k=0;k<currentWord.size();)
                    }
                }
            }
        }
};