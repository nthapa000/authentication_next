#include<bits/stdc++.h>
using namespace std;

int main(){
    int t;
    cin>>t;
    while(t--){
        int x1,x2,x3;
        cin>>x1>>x2>>x3;
        int a;
        int minDis=INT_MAX;
        for(int i=1;i<=10;i++){
            int diff1 = abs(i-x1);
            int diff2 = abs(i-x2);
            int diff3 = abs(i-x3);
            int sum = diff1+diff2+diff3;
            minDis=min(minDis,sum);
        }
        cout<<minDis<<endl;
    }
}