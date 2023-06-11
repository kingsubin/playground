#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void swap(int *x, int *y) {
    int temp;
    temp = *x;
    *x = *y;
    *y = temp;
}

void static_test() {
    static int s;

    auto int a = 0;
    ++s;
    ++a;

    printf("static s = %d, auto a = %d \n", s, a);
}

void register_test() {
    register int num1 = 10;
    register long long num2 = 20;
    printf("num1 size = %d, num2 size = %d \n", sizeof(num1), sizeof(num2));
//    printf("%p, %p \n", *num1, *num2);

    num2 = 0;
    for (num1 = 0; num1 <= 10; ++num1) {
        num2 += num1;
    }
    num1--;
    printf("num1 = %d, num2 = %lld", num1, num2);
}

void ex51() {
    char in_s[50], out_s[50];
    int i = 0;

    printf("문자열 입력 (50자이내): ");
    scanf("%s", in_s);
    char ch = in_s[i];

    while (ch != '\0') {
        if (ch >= 'A' && ch <= 'Z')
            out_s[i] = ch + 32;
        else if (ch >= 'a' && ch <= 'z')
            out_s[i] = ch - 32;
        else
            out_s[i] = ch;

        i++;
        ch = in_s[i];
    }
    out_s[i] = '\0';
    printf("result: %s \n", out_s);
}

unsigned int ex52_factorial(unsigned int a) {
    if (a == 1)
        return 1;
    else {
        a *= ex52_factorial(a - 1);
        return a;
    }
}

void ex52() {
    unsigned int f, x;

    puts("Enter integer 1 ~ 8: ");
    scanf("%d", &x);

    if (x > 8 || x < 1) {
        printf("only 1 ~ 8");
    } else {
        f = ex52_factorial(x);
        printf("%u factorial equals %u \n", x, f);
    }
}


void ex53_by_value(int a, int b, int c) {
    a = 0;
    b = 0;
    c = 0;
}

void ex53_by_ref(int *a, int *b, int *c) {
    *a = 0;
    *b = 0;
    *c = 0;
}

void ex53() {
    int x = 2, y = 4, z = 6;
    printf("before by_value \t: ");
    printf("x = %d, y = %d, z = %d \n", x, y, z);

    ex53_by_value(x, y, z);
    printf("after by_value \t: ");
    printf("x = %d, y = %d, z = %d \n", x, y, z);

    ex53_by_ref(&x, &y, &z);
    printf("after by_ref \t: ");
    printf("x = %d, y = %d, z = %d \n", x, y, z);
}

void ex67_score_sum(int gr[][5], int row, int column) {
    int sum[2] = {0};
    int i, j;

    for (i = 0; i < row; i++) {
        for (j = 0; j < column; j++) {
            sum[i] += gr[i][j];
        }
        printf("sum[%d] = %d \n", i, sum[i]);
    }
}


void ex67() {
    int score[2][5] = {{10, 20, 30, 40, 50},
                       {10, 10, 10, 10, 10}};
    ex67_score_sum(score, 2, 5);
}

void ex610() {
    int *p, i = 3, j;
    p = &i;
    j = *p;
    j++;

    printf("*p = %d \n", *p);
    printf(" p = %x \n", p);
    printf(" j = %d \n", j);
}

void ex612() {
    int a = 100;
    char b = 'b';
    void *p = NULL;

    p = (int *) &a;
    printf("*p = %d \n", *(int *) p);

    p = (char *) &b;
    printf("*p = %c \n", *(char *) p);
}

void ex613() {
    int *p, a[] = {10, 20, 30, 40, 50};
    p = &a[0];

    printf("*p      == %d \n", *p);
    printf("*p++    == %d \n", *p++);

    printf("*++p    == %d \n", *++p);

    p = p + 2;
    printf("*p      == %d \n", *p);
    printf("a[2]    == %d \n", a[2]);
    printf("*p + 2  == %d \n", *p + 2);
}

void ex614() {
    int *p, *q;
    int a[] = {10, 20, 30, 40, 50, 60, 70, 80, 90, 100};
    p = &a[3];
    printf("*p == %d \n", *p);
    printf("*(p+3) == %d \n", *(p + 3));
    q = p + 3;
    printf("*q == %d \n", *q);
    printf("p - q == %d \n", p - q);
    printf("q - p == %d \n", q - p);
}

void ex616() {
    int a[] = {10, 20, 30, 40, 50};
    int *pa, b, c, d;
    pa = a;

    b = *pa + *(pa + 4);
    pa += 4;
    c = *pa + *(pa - 4);
    d = *pa + 5;

    printf("b=%d, c=%d, d=%d", b, c, d);
}

void ex617() {
    int a[3][3] = {{1, 2, 3},
                   {4, 5, 6},
                   {7, 8, 9}};
    int i, j, *pt;
    pt = a[0];

    while (pt <= &a[2][2]) {
        for (i = 0; i < 3; i++) {
            for (j = 0; j < 3; j++) {
                printf("a[%d][%d] = %d ", i, j, *pt);
                pt++;
            }
            printf("\n");
        }
    }
}

void ex618() {
    char A[] = "KINGSUBIN";
    char *p = A;
    int i;
    int size = sizeof(A);

    for (i = 0; i < size - 1; i++) {
        printf("*(A+%d): %c \n", i, *(A + i));
    }
    for (i = 0; i < size - 1; i++) {
        printf("p[%d]: %c \n", i, p[i]);
    }
}

void ex620() {
    int a[] = {1, 2, 3, 4};
    int b[] = {5, 6, 7, 8};

    int *PA[2];
    PA[0] = a;
    PA[1] = b;

    printf("*(PA[0]) = %d \n", *(PA[0]));
    printf("*(PA[0] + 1) = %d \n", *(PA[0] + 1));
    printf("*PA[1] = %d \n", *PA[1]);
    printf("*PA[1] + 15 = %d \n", *PA[1] + 15);
}

void ex621() {
    char a = 'A', *p, **pp;
    p = &a;
    pp = &p;
    printf("**pp = %c", **pp);
}

void ex61() {
    // d = xi - avg
    int n, count;
    float avg, d, sum = 0;
    float list[100];

    printf("data count?");
    scanf("%d", &n);

    for (count = 0; count < n; ++count) {
        printf("i = %d x =", count + 1);
        scanf("%f", &list[count]);
        sum += list[count];
    }

    avg = sum / n;
    printf("avg is %5.2f \n", avg);

    for (count = 0; count < n; ++count) {
        d = list[count] - avg;
        printf("i = %d x = %5.2f d = %5.2f \n", count + 1, list[count], d);
    }
}


struct ex71_person {
    char name[8];
    int age;
    char sex;
};

void ex71() {
    struct ex71_person X = {"soob", 30, 'M'};
    struct ex71_person Y;
    strcpy(Y.name, "SOOB");

    Y.age = 35;
    Y.sex = 'F';

    printf("X: %s, %d, %c \n", X.name, X.age, X.sex);
    printf("Y: %s, %d, %c \n", Y.name, Y.age, Y.sex);
    printf("sizeof(person): %dbyte \n", sizeof(X));
}

struct ex74_student {
    char name[10];
    int kor;
    int math;
};

void ex74() {
    struct ex74_student hs[4] = {{"soob1", 90, 95},
                                 {"soob2", 85, 90},
                                 {"soob3", 70, 85},
                                 {"soob4", 95, 75}};
    struct ex74_student *p;
    p = hs;

    printf("%s %d %d \n", p->name, p->kor, p->math);

    p += 3;
    printf("%s %d %d \n", p->name, p->kor, p->math);

    p--;
    printf("%s %d %d \n", p->name, p->kor, p->math);
}

void ex81() {
    char ch;
    FILE *fp;

    fp = fopen("sample.txt", "w");
    for (ch = 'A'; ch <= 'Z'; ch++) {
        fputc(ch, fp);
    }
    fclose(fp);
}

int ex801_file_copy(char *oldname, char *newname) {
    FILE *fold, *fnew;
    int c;

    if ((fnew = fopen(newname, "wb")) == NULL) {
        return -1;
    }
    if ((fold = fopen(oldname, "rb")) == NULL) {
        return -1;
    }

    while (1) {
        c = fgetc(fold);
        if (!feof(fold)) {
            fputc(c, fnew);
        } else {
            break;
        }
    }

    fclose(fnew);
    fclose(fold);

    return 0;
}

void ex801() {
    // /Users/subin.lee/Project/c-tutorial/some.txt
    char source[80], destination[80];
    printf("\n enter source file: ");
    gets(source);
    printf("\n enter destination file: ");
    gets(destination);

    if (ex801_file_copy(source, destination) == 0) {
        puts("\n copy operation success");
    } else {
        fprintf(stderr, "\n err copy");
    }
}

void ex92() {
    int *a;
    a = (int *) malloc(sizeof(int));
    if (a == NULL) {
        puts("fail");
        exit(1);
    }

    *a = 20;
    printf("heap a: %d \n", *a);
    free(a);
}

void ex93() {
    int size;
    char *str;
    printf("string len ?: ");
    scanf("%d", &size);

    str = (char *) malloc(size + 1);

    if (str == NULL) {
        puts("fail");
        exit(1);
    }

    printf("string: ");
    scanf("%s", str);
    printf("dynamic allocation str: %s \n", str);
    free(str);
}

void ex902() {
    int size = 26;
    int i;
    char *alpha, ch;
    alpha = (char *) malloc(size * sizeof(char));

    for (i = 0, ch = 'A'; i < size; i++, ch++) {
        *(alpha + i) = ch;
    }
    for (i = 0; i < size; i++) {
        printf("%c ", *(alpha + i));
    }

    free(alpha);
}

void ex903() {
    char *str;
    str = (char *) malloc(sizeof(char) * 10);
    strcpy(str, "123456789");
    printf("before: str = %s \n", str);

    str = (char *) realloc(str, 50);
    strcat(str, "abcdefghijklmnopqrstuvwxyz");
    printf("after: str = %s \n", str);

    free(str);
}

int main() {
    ex903();
    return 0;
}
