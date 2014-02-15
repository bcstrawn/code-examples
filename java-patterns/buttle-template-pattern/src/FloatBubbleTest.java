import static org.junit.Assert.*;

import org.junit.Test;


public class FloatBubbleTest {

	@Test
	public void testTwoSortedValues() {
		float[] nums = {2, 3};
		float[] numsSorted = {2, 3};
		FloatBubble bubble = new FloatBubble();
		bubble.sort(nums);
 		assertArrayEquals(nums, numsSorted, .05F);
	}

	@Test
	public void testTwoUnsortedValues() {
		float[] nums = {3, 1};
		float[] numsSorted = {1, 3};
		FloatBubble bubble = new FloatBubble();
		bubble.sort(nums);
 		assertArrayEquals(numsSorted, nums, .05F);
	}
	
	@Test
	public void testThreeUnsortedValues() {
		float[] nums = {3, 2, 1};
		float[] numsSorted = {1, 2, 3};
		FloatBubble bubble = new FloatBubble();
		bubble.sort(nums);
 		assertArrayEquals(numsSorted, nums, .05F);
	}

}
