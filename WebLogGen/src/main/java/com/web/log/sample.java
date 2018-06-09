package com.web.log;
import java.util.Random;

/**
 * 
 */

/**
 * @author system1
 * 
 */

public class sample {

	/**
	 * @param args
	 */
	String[] websites = { "http://www.google.com", "http://www.facebook.com",
			"http://www.shophealthy.com", "http://www.twitter.com",
			"http://www.ebay.com", "http://www.xyz.com", "http://www.abc.com",
			"http://www.yahoo.com", "http://www.homeshop18.com",
			"http://www.amazon.com" };
	String[] alphabets = { "A", "B", "C", "D", "E", "F", "G", "H", "I", "J",
			"K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W",
			"X", "Y", "Z" };
	int asize = alphabets.length;
	String[] numbers = { "0", "1", "2", "3", "4", "5", "6", "7", "8", "9" };
	int nsize = numbers.length;
	Random random = new Random();

	public String timeStamp() {
		return null;

	}

	public String url() {

		int random_number = random.nextInt(websites.length);

		return websites[random_number];
	}

	public String userid() {

		int[] n = { 3, 4, 5, 6 };

		String userid = "__RequestVerificationToken_Lw__=";
		int m = random.nextInt(n.length);
		System.out.println(n[m]);
		if (n[m] == 3) {

			int zero = random.nextInt(asize);
			int one = random.nextInt(nsize);
			int two = random.nextInt(asize);
			int three = random.nextInt(asize);
			int four = random.nextInt(nsize);
			int five = random.nextInt(nsize);
			int six = random.nextInt(asize);
			int seven = random.nextInt(asize);
			int eight = random.nextInt(asize);
			int nine = random.nextInt(asize);
			int ten = random.nextInt(nsize);
			int eleven = random.nextInt(asize);
			userid += alphabets[zero] + numbers[one] + alphabets[two]
					+ alphabets[three] + alphabets[four] + numbers[five]
					+ alphabets[six] + alphabets[seven] + alphabets[eight]
					+ alphabets[nine] + numbers[ten] + alphabets[eleven];

		}
		if (n[m] == 4) {
			int zero = random.nextInt(asize);
			int one = random.nextInt(nsize);
			int two = random.nextInt(asize);
			int three = random.nextInt(asize);
			int four = random.nextInt(asize);
			int five = random.nextInt(nsize);
			int six = random.nextInt(asize);
			int seven = random.nextInt(asize);
			int eight = random.nextInt(asize);
			int nine = random.nextInt(asize);
			int ten = random.nextInt(nsize);
			int eleven = random.nextInt(asize);
			userid += alphabets[zero] + numbers[one] + alphabets[two]
					+ alphabets[three] + alphabets[four] + numbers[five]
					+ alphabets[six] + alphabets[seven] + alphabets[eight]
					+ alphabets[nine] + numbers[ten] + alphabets[eleven];
		}
		if (n[m] == 5) {
			int zero = random.nextInt(asize);
			int one = random.nextInt(asize);
			int two = random.nextInt(nsize);
			int three = random.nextInt(asize);
			int four = random.nextInt(asize);
			int five = random.nextInt(asize);
			int six = random.nextInt(nsize);
			int seven = random.nextInt(nsize);
			int eight = random.nextInt(asize);
			int nine = random.nextInt(asize);
			int ten = random.nextInt(asize);
			int eleven = random.nextInt(nsize);
			userid += alphabets[zero] + alphabets[one] + numbers[two]
					+ alphabets[three] + alphabets[four] + alphabets[five]
					+ numbers[six] + numbers[seven] + alphabets[eight]
					+ alphabets[nine] + alphabets[ten] + numbers[eleven];
		}
		if (n[m] == 6) {
			int zero = random.nextInt(nsize);
			int one = random.nextInt(nsize);
			int two = random.nextInt(asize);
			int three = random.nextInt(nsize);
			int four = random.nextInt(asize);
			int five = random.nextInt(asize);
			int six = random.nextInt(asize);
			int seven = random.nextInt(asize);
			int eight = random.nextInt(nsize);
			int nine = random.nextInt(asize);
			int ten = random.nextInt(nsize);
			int eleven = random.nextInt(nsize);
			userid += numbers[zero] + numbers[one] + alphabets[two]
					+ numbers[three] + alphabets[four] + alphabets[five]
					+ alphabets[six] + alphabets[seven] + numbers[eight]
					+ alphabets[nine] + numbers[ten] + numbers[eleven];
		}
		return userid;

	}

	public String sessionid() {

		int nsize = numbers.length;
		int zero = random.nextInt(asize);
		int one = random.nextInt(asize);
		int two = random.nextInt(nsize);
		int three = random.nextInt(asize);
		int four = random.nextInt(asize);
		int five = random.nextInt(asize);
		int six = random.nextInt(nsize);
		int seven = random.nextInt(nsize);
		int eight = random.nextInt(asize);
		int nine = random.nextInt(asize);
		int ten = random.nextInt(asize);
		int eleven = random.nextInt(nsize);
		int twelve = random.nextInt(asize);
		int thirteen = random.nextInt(asize);
		int fourteen = random.nextInt(nsize);
		int fifteen = random.nextInt(asize);
		int sixteen = random.nextInt(asize);

		String sessionid = alphabets[zero] + alphabets[one] + numbers[two]
				+ alphabets[three] + alphabets[four] + alphabets[five]
				+ numbers[six] + numbers[seven] + alphabets[eight]
				+ alphabets[nine] + alphabets[ten] + numbers[eleven]
				+ alphabets[twelve] + alphabets[thirteen] + numbers[fourteen]
				+ alphabets[fifteen] + alphabets[sixteen];
		return ";+.ASPXAUTH="+sessionid;
	}
	
	public String productId()
	{
		int nsize = numbers.length;
		int zero = random.nextInt(asize);
		int one = random.nextInt(asize);
		int two = random.nextInt(nsize);
		int three = random.nextInt(asize);
		int four = random.nextInt(asize);
		int five = random.nextInt(asize);
		int six = random.nextInt(nsize);
		int seven = random.nextInt(nsize);
		int eight = random.nextInt(asize);
		String productId =  alphabets[one]+ alphabets[eight] + numbers[two]+ numbers[six] 
				+ alphabets[three]+ alphabets[zero]+ numbers[seven] + alphabets[four] + alphabets[five];
		String[] s = {"/search/","/product/"};
		int se = random.nextInt(s.length);
		return s[se]+productId;
		
	}
	

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		sample s = new sample();
		String web_url = s.url();
		String user_id = s.userid();
		String session_id = s.sessionid();
	}
}
