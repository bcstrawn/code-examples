package strategy;

import static org.junit.Assert.*;
import org.junit.Test;

/* Pros:
 * The Bike type classes are very lean
 * 
 * Cons:
 * Every type of bike must have the same builder rules
 * The code is more complex with the abstracted biketype
 * possible code smell in bike constructor
 * 
 * */

public class BikeTest {
	@Test
	public void unmodifiedMountainBikeHasSpeedOf1() {
		Bike bike = Bike.getBuilder().createBike(new MountainBikeType()).build();
		assertEquals(bike.getSpeed(), 1);
	}
	
	@Test
	public void unmodifiedFixedSpeedBikeHasSpeedOf2() {
		Bike bike = Bike.getBuilder().createBike(new FixedBikeType()).build();
		assertEquals(bike.getSpeed(), 2);
	}
	
	@Test
	public void unmodifiedRacingBikeHasSpeedOf3() {
		Bike bike = Bike.getBuilder().createBike(new RacingBikeType()).build();
		assertEquals(bike.getSpeed(), 3);
	}
	
	@Test
	public void fixedSpeedBikeWithSkinnyTireAndRolloverHandlebarHasSpeedOf5() {
		Bike bike = Bike.getBuilder().createBike(new FixedBikeType()).tires(new SkinnyTire()).handlebars(new RolloverHandlebar()).build();
		assertEquals(bike.getSpeed(), 5);
	}
	
	@Test
	public void MountainBikeWithWindBreakTireAndBullhornHandlebarHasSpeedOf5() {
		Bike bike = Bike.getBuilder().createBike(new MountainBikeType()).tires(new WindBreakTire()).handlebars(new BullhornHandlebar()).build();
		assertEquals(bike.getSpeed(), 5);
	}
	
	@Test
	public void RacingBikeWithFatTireAndStraightHandlebarHasSpeedOf3() {
		Bike bike = Bike.getBuilder().createBike(new RacingBikeType()).tires(new FatTire()).handlebars(new StraightHandlebar()).build();
		assertEquals(bike.getSpeed(), 3);
	}
}
