import java.util.function.Function;

public class SumDemo {
  private static int sum(Function<Integer, Integer> f, int a, int b) {
    int total = 0;
    for (int i = a; i <= b; i++) {
      total += f.apply(i);
    }
    return total;
  }

  public static void main(String[] args) {
    System.out.println(sum(i -> { return i * i * i; }, 3, 5));
  }
}
