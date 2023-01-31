package com.enixone.enixClever.core.common;
import java.util.concurrent.atomic.AtomicInteger;

public class GenerateKey {

	
	//전역 객체변수로 사용하기 위해 static 객체변수로 생성
	static GenerateKey instance;
	
	//생성자를 priavte로 만들어 접근을 막는다
	private GenerateKey(){}
	
	//getInstance 메소드를 통해 한번만 생성된 객체를 가져온다.
	public static GenerateKey getInstance(){
		if(instance == null){ //최초 한번만 new 연산자를 통하여 메모리에 할당한다.
			instance = new GenerateKey();
		}		
		return instance;
	}
	
	AtomicInteger seq;
	
	// Function to perform right padding
    public String getKey(String part)
    {
  
    	String result = part;
    	if(seq == null)	seq = new AtomicInteger();
		
		int nextSeq = seq.incrementAndGet();
		long nowTime = System.currentTimeMillis();
		
		if(nextSeq >= 999) seq.set(0);
		
		// Return the resultant string
        return result + encoding(nowTime)+leftPadding(nextSeq, '0', 3);
    }
	
	
	// Function to perform right padding
    public String rightPadding(String input, char ch, int L)
    {
  
        String result
            = String
  
                  // First right pad the string
                  // with space up to length L
                  .format("%" + (-L) + "s", input)
  
                  // Then replace all the spaces
                  // with the given character ch
                  .replace(' ', ch);
  
        // Return the resultant string
        return result;
    }

    // Function to perform left padding
    public String leftPadding(int input, char ch, int L)
    {
  
        String result
            = String
  
                  // First left pad the string
                  // with space up to length L
                  .format("%" + L + "s", input)
  
                  // Then replace all the spaces
                  // with the given character ch
                  .replace(' ', ch);
  
        // Return the resultant string
        return result;
    }
	
	
	final int RADIX = 62;
	final String CODEC = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	
	public String encoding(long param) {
		StringBuffer sb = new StringBuffer();
		while(param > 0) {
			sb.append(CODEC.charAt((int) (param % RADIX)));
			param /= RADIX;
		}
		return sb.toString();
	}
	
	public long decoding(String param) {
		long sum = 0;
		long power = 1;
		for (int i = 0; i < param.length(); i++) {
			sum += CODEC.indexOf(param.charAt(i)) * power;
			power *= RADIX;
		}
		return sum;
	}

}
