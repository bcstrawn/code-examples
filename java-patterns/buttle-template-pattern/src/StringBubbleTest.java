import static org.junit.Assert.*;

import org.junit.Test;


public class StringBubbleTest {

	@Test
	public void testTwoSortedValues() {
		String[] nums = {"2", "1"};
		String[] numsSorted = {"1", "2"};
		StringBubble bubble = new StringBubble();
		bubble.sort(nums);
 		assertArrayEquals(nums, numsSorted);
	}

	@Test
	public void testTwoUnsortedValues() {
		String[] nums = {"3", "1"};
		String[] numsSorted = {"1", "3"};
		StringBubble bubble = new StringBubble();
		bubble.sort(nums);
 		assertArrayEquals(numsSorted, nums);
	}
	
	@Test
	public void testThreeUnsortedValues() {
		String[] nums = {"3", "2", "1"};
		String[] numsSorted = {"1", "2", "3"};
		StringBubble bubble = new StringBubble();
		bubble.sort(nums);
 		assertArrayEquals(numsSorted, nums);
	}

}
